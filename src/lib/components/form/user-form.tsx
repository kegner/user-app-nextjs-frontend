'use client';

import { FormState, User, UserKey } from '@/lib/types/types';
import React, { useState } from 'react';
import SubmitButton from './submit-button';
import NavButton from '../layout/nav-button';
import TextField from './text-field';
import { UserFormSchema } from '@/lib/schema';
import useFormSubmit from '@/lib/hooks/use-form-submit';

function getError(field: UserKey, validationErrors?: Map<UserKey, string[]>) {
  return validationErrors?.get(field)?.join(', ');
}

export default function UserForm({
  user,
  formAction,
}: {
  user?: User;
  formAction: (
    prevState: FormState<User>,
    formData: FormData,
  ) => Promise<FormState<User>>;
}) {
  const [formData, setFormData] = useState<UserFormSchema>({
    id: user?.id ?? '',
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
  });

  const { state, isPending, submitAction, submitHandler } = useFormSubmit({
    formAction,
  });

  return (
    <div className="flex justify-center">
      <form onSubmit={submitHandler} action={submitAction}>
        <div className="grid w-88 grid-cols-1 justify-items-center gap-4 rounded bg-neutral-800 p-4">
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, firstName: e.target.value }));
            }}
            errorMessage={getError('firstName', state.validationErrors)}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, lastName: e.target.value }));
            }}
            errorMessage={getError('lastName', state.validationErrors)}
          />
          <TextField
            label="Email"
            name="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
            }}
            errorMessage={getError('email', state.validationErrors)}
          />
          <input type="hidden" name="id" id="id" value={formData.id} />
          <div className="mt-2 flex w-full justify-between">
            <NavButton href="/">Cancel</NavButton>
            <SubmitButton disabled={isPending}>Save</SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
