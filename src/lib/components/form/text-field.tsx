import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export default function TextField({
  label,
  name,
  errorMessage,
  ...rest
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  errorMessage?: string;
}) {
  return (
    <div className="grid grid-cols-1">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        name={name}
        className="w-80 rounded border-1 border-neutral-200 bg-neutral-900 py-2 pl-2
          placeholder:text-neutral-400 focus:ring-blue-400 focus:outline-blue-400"
      />
      {errorMessage && <div className="text-red-400">{errorMessage}</div>}
    </div>
  );
}
