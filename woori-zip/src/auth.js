import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn as signInFromBackend, wooriSignIn } from '@/app/api/authApi';

// const refreshAccessToken = async (token) => {
//   const { accessToken, refreshToken } = await reissueToken(token.refreshToken);

//   if (accessToken && refreshToken) {
//     return {
//       ...token,
//       accessToken,
//       refreshToken,
//       expires_at: Date.now() + (2505600 * 1000),
//     };
//   }

//   return {
//     ...token,
//     error: 'RefreshAccessTokenError',
//   };
// };

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      id: "woorizip",
      async authorize({ username, password }) {
        const response = await signInFromBackend({
          username: username,
          password: password,
        });

        if(!response.success) {
          throw Error(response.data.message);
        }

        return response.data;
      },
      profile(accessToken, name) {
        return {
          id: name,
          username: name,
          accessToken,
        };
      },
    }),
    CredentialsProvider({
      id: "oauth-woori",
      async authorize({ code }) {
        try {
          console.log('code in auth.js', code);
          const response = await wooriSignIn(code);
          console.log('response in auth.js');
          console.log('response', response);
          console.log('###########');
          return response.data;
        } catch (error) {
          console.error(`Auth error with code ${code}:`, error);
          return null;
        }
      },
      profile(accessToken, name) {
        return {
          id: name,
          username: name,
          accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('console in auth.js');
      console.log('token', token);
      console.log('user', user);
      console.log('account', account);
      console.log('##########');
      if (user && account) {
        return {
          ...token,
          accessToken: user.accessToken,
          expires_at: Date.now() + (2505600 * 1000),
          user,
        };
      }

      if (Date.now() < token.expires_at) {
        return token;
      }

      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
      // return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      console.log('console in auth.js - session');
      console.log('session', session);
      console.log('token', token);
      console.log('#############');
      if (token) {
        session.user.accessToken = token.user.accessToken;
        session.user.name = token.user.name;
        session.user.expires_at = token.expires_at;
        session.error = token.error;
      }
      return session;
    },
    async redirect(){
      return '/';
    }
  },
  pages: {
    signIn: '/user/login',
  },
  
});