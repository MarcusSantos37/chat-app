import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  name: string;
  label: string;
  errorMessage?: string | undefined;
}

const CustomInput = ({
  register,
  name,
  label,
  errorMessage,
  ...rest
}: CustomInputProps) => {
  return (
    <div className="flex flex-col">
      <label className="label p-2">
        <span className="text-base label-text">{label}</span>
      </label>
      <input
        {...register(name)}
        className="w-full input input-bordered h-10"
        {...rest}
      />
      {errorMessage && (
        <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomInput;
