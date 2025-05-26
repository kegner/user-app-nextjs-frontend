import { createUser } from '@/lib/actions';
import UserForm from '@/lib/components/form/user-form';
import React from 'react';

export default function Create() {
  return <UserForm formAction={createUser} />;
}
