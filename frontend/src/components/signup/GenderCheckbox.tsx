import { UseFormRegister } from "react-hook-form";

type Inputs = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

interface GenderCheckboxProps {
  register: UseFormRegister<Inputs>;
  errorMessage?: string | undefined;
}

const GenderCheckbox = ({ register, errorMessage }: GenderCheckboxProps) => {
  return (
    <div className="flex flex-col mt-5">
      <div className="flex flex-row items-start">
        <div className="form-control">
          <label className="label gap-2 cursor-pointer">
            <span className="label-text">Male</span>
            <input
              {...register("gender")}
              value="male"
              type="radio"
              className="radio border-slate-900"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label gap-2 cursor-pointer">
            <span className="label-text">Female</span>
            <input
              {...register("gender")}
              value="female"
              type="radio"
              className="radio border-slate-900"
            />
          </label>
        </div>
      </div>
      {errorMessage && (
        <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default GenderCheckbox;
