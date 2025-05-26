import { useActionState, useCallback, useEffect, useState } from 'react';
import { FormState, User } from '../types/types';
import { toast } from 'react-toastify';
import { useLoaderStore } from '../store';

type FormAction<T> = (
  prevState: FormState<T>,
  formData: FormData,
) => Promise<FormState<T>>;

export default function useFormSubmit({
  formAction,
}: {
  formAction: FormAction<User>;
}) {
  const [hasError, setHasError] = useState(false);

  const [state, submitAction, isPending] = useActionState(formAction, {
    error: false,
    message: '',
  });

  const submitHandler = useCallback(() => {
    setHasError(false);
  }, []);

  const { setLoading } = useLoaderStore((state) => state);

  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  useEffect(() => {
    if (state.error && !hasError) {
      setHasError(true);
      toast.error(state.message);
    }
  }, [state.error, state.message, hasError]);

  return {
    state,
    isPending,
    submitAction,
    submitHandler,
  };
}
