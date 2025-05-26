import React, { ReactNode } from 'react';

export default function SubmitButton({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      className="focus:outline-netural-200 h-8 cursor-pointer rounded bg-blue-600 px-2 font-bold
        text-white hover:bg-blue-800 focus:bg-blue-800"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
