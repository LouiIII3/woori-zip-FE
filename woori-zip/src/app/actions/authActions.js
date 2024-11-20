'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const handleCredentialsSignin = async ({ username, password }) => {
  try {
    await signIn('credentials', { username, password, redirectTo: '/' });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'Invalid credentials',
          };
        default:
          return {
            message: 'Something went wrong.',
          };
      }
    }
    throw error;
  }
};