import { parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from 'next';

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    if (cookies['dashgo.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }
    return await fn(ctx);
  }
}