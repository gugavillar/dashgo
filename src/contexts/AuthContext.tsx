import { createContext, ReactNode, useEffect, useState } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import Router from 'next/router';
import { apiAuth } from '../services/apiAuthClient';

interface User {
  email: string;
  permissions: string[];
  roles: string[]
}

interface AuthProviderProps {
  children: ReactNode;
}

interface CredentialsData {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: CredentialsData) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
}


export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'dashgo.token');
  destroyCookie(undefined, 'dashgo.refreshToken');
  authChannel.postMessage('signOut');
  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');
    authChannel.onmessage = (message => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    })
  }, []);

  useEffect(() => {
    const { 'dashgo.token': token } = parseCookies();
    if (token) {
      apiAuth.get('/me').then(response => {
        const { email, permissions, roles } = response.data;
        setUser({ email, permissions, roles });
      }).catch(err => signOut());
    }
  }, []);

  async function signIn({ email, password }: CredentialsData) {
    try {
      const response = await apiAuth.post('sessions', {
        email,
        password
      });
      const { token, refreshToken, permissions, roles } = response.data;
      setCookie(undefined, 'dashgo.token', token, {
        maxAge: 60 * 60 * 24 * 30, //30days
        path: '/'
      });
      setCookie(undefined, 'dashgo.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30days
        path: '/'
      });
      setUser({ email, permissions, roles });
      apiAuth.defaults.headers['Authorization'] = `Bearer ${token}`;
      Router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}