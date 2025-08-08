"use client";

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface ReceivedProps {
  type: string;
  placeHolder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export function Input({
  name,
  placeHolder,
  type,
  register,
  error,
  rules,
}: ReceivedProps) {
  return (
    <>
      <input
        id={name}
        placeholder={placeHolder}
        type={type}
        className="w-full border-2 px-2 py-1 rounded-md h-11"
        {...register(name, rules)}
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
