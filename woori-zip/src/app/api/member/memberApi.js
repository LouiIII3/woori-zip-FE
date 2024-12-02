'use server';

import { instance } from "../instance";

export const validEmail = async (email) => {
  return await instance(`members/valid?username=${email}`, {
    method: 'GET',
    credentials: 'include',
  });
};

export const signUp = async ({email, name, password, birthday, licenseId, gender, roleName}) => {
    return await instance(`sign-up?role=${roleName}`, {
      body: JSON.stringify({ name, username: email, password, birthday, licenseId, gender }),
      method: 'POST',
      credentials: 'include',
    });
};