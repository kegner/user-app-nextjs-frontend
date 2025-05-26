import { updateUser } from '@/lib/actions';
import UserForm from '@/lib/components/form/user-form';
import { fetchUser } from '@/lib/data';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function Edit(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const user = await fetchUser(id);

  if (!user) {
    notFound();
  }

  return <UserForm formAction={updateUser} user={user} />;
}
