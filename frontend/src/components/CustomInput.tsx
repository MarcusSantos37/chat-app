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
      <label className="label">
        <span className="text-sm font-semibold text-[#121212] label-text">
          {label}
        </span>
      </label>
      <input
        {...register(name)}
        className="w-full bg-white input placeholder:text-[#6B6B6B] text-[#121212] text-sm input-bordered h-10"
        {...rest}
      />
      {errorMessage && (
        <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomInput;
