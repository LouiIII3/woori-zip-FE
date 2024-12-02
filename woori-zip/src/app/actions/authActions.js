'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const handleCredentialsSignin = async ({ username, password }) => {
  try {
    await signIn('woorizip', { username, password, redirectTo: '/' });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: error.cause.err.message,
      };
    }
    throw error;
  }
};