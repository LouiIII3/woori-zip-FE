import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { reissueToken, signIn as signInFromBackend } from '@/app/api/authApi';

const refreshAccessToken = async (token) => {
  const { accessToken, refreshToken } = await reissueToken(token.refreshToken);

  if (accessToken && refreshToken) {
    return {
      ...token,
      accessToken,
      refreshToken,
      expires_at: Date.now() + (2505600 * 1000),
    };
  }

  return {
    ...token,
    error: 'RefreshAccessTokenError',
  };
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: '아이디', type: 'username', placeholder: '아이디를 입력해주세요.' },
        password: { label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력해주세요.' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const response = await signInFromBackend({
            username: credentials.username,
            password: credentials.password,
          });

          const { accessToken, refreshToken } = response;

          return {
            id: credentials.username,
            username: credentials.username,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expires_at: Date.now() + (2505600 * 1000),
          user,
        };
      }

      if (Date.now() < token.expires_at) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.expires_at = token.expires_at;
        session.error = token.error;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});