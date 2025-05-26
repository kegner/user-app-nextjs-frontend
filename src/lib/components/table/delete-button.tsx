'use client';

import { deleteUser } from '@/lib/actions';
import { TrashIcon } from '@heroicons/react/24/solid';
import useFormSubmit from '@/lib/hooks/use-form-submit';

export default function DeleteButton({ id }: { id: string }) {
  const deleteUserWithId = deleteUser.bind(null, null, id);

  const { isPending, submitAction, submitHandler } = useFormSubmit({
    formAction: deleteUserWithId,
  });

  return (
    <form onSubmit={submitHandler} action={submitAction}>
      <button type="submit" className="cursor-pointer" disabled={isPending}>
        <TrashIcon
          className="w-6"
          color={isPending ? '#888' : '#fff'}
          aria-label="Delete User"
        />
      </button>
    </form>
  );
}
