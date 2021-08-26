import { GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { validateUsersPermissions } from '../utils/validateUsersPermissions';
import decode from 'jwt-decode';
import { AuthTokenError } from '../services/errors/AuthTokenError';


interface WithSSRAuthOptions {
  permissions?: string[];
  roles?: string[];
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['dashgo.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    if (options) {
      const user = decode<{ permissions: string[], roles: string[] }>(token);
      const { permissions, roles } = options;
      const userHasValidPermissions = validateUsersPermissions({ user, permissions, roles });

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'dashgo.token');
        destroyCookie(ctx, 'dashgo.refreshToken');
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}