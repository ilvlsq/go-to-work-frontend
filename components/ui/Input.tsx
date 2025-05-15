import React from 'react';
import clsx from 'clsx';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const base =
  'block w-full rounded-full px-6 py-3 bg-gray-50 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#38b48e] text-base placeholder-gray-400 placeholder:text-sm';

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...props },
  ref,
) {
  return <input ref={ref} className={clsx(base, className)} {...props} />;
});
