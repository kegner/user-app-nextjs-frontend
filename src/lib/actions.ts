'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateUserSchema, UpdateUserSchema } from './schema';
import { FormState, User, UserKey } from './types/types';
import { ZodIssue } from 'zod';

function getErrors(errors: ZodIssue[]) {
  const errorMapping: Map<UserKey, string[]> = new Map<UserKey, string[]>([
    ['firstName', []],
    ['lastName', []],
    ['email', []],
  ]);

  errors.forEach((e) => {
    e.path.forEach((field) => {
      const messages = errorMapping.get(field as UserKey) ?? [];
      const updatedMessages = [...messages, e.message];
      errorMapping.set(field as UserKey, updatedMessages);
    });
  });

  return errorMapping;
}

export async function createUser(
  _: FormState<User>,
  formData: FormData,
): Promise<FormState<User>> {
  const result = CreateUserSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
  });

  if (!result.success) {
    return {
      validationErrors: getErrors(result.error.errors),
    };
  }

  const { firstName, lastName, email } = result.data;

  try {
    await fetch(process.env.SERVER_URL + '/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
          createUser(user: {
            firstName: "${firstName}",
            lastName: "${lastName}",
            email: "${email}"
          }) {
            id,
            createdDate,
            firstName,
            lastName,
            email
          }
        }`,
      }),
    });
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: 'An error occurred creating the user.',
    };
  }

  const params = new URLSearchParams();
  params.set('showToast', 'true');
  params.set('toastMessage', 'User created successfully.');

  revalidatePath('/');
  redirect(`/?${params.toString()}`);
}

export async function updateUser(
  _: FormState<User>,
  formData: FormData,
): Promise<FormState<User>> {
  const result = UpdateUserSchema.safeParse({
    id: formData.get('id'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
  });

  if (!result.success) {
    return {
      validationErrors: getErrors(result.error.errors),
    };
  }

  const { id, firstName, lastName, email } = result.data;

  try {
    await fetch(process.env.SERVER_URL + '/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
          updateUser(user: {
            id: "${id}",
            firstName: "${firstName}",
            lastName: "${lastName}",
            email: "${email}"
          }) {
            id,
            createdDate,
            firstName,
            lastName,
            email
          }
        }`,
      }),
    });
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: 'An error occurred updating the user.',
    };
  }

  const params = new URLSearchParams();
  params.set('showToast', 'true');
  params.set('toastMessage', 'User updated successfully.');

  revalidatePath('/');
  redirect(`/?${params.toString()}`);
}

export async function deleteUser(
  _: FormState<User> | null,
  id: string,
): Promise<FormState<User>> {
  try {
    await fetch(process.env.SERVER_URL + '/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {
          deleteUser(id: "${id}")
        }`,
      }),
    });
  } catch (error) {
    console.error(error);

    return {
      error: true,
      message: 'An error occurred deleting the user.',
    };
  }

  const params = new URLSearchParams();
  params.set('showToast', 'true');
  params.set('toastMessage', 'User deleted successfully.');

  revalidatePath('/');
  redirect(`/?${params.toString()}`);
}
