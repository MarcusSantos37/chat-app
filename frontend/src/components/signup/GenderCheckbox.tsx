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
            <span className="label-text text-[#121212]">Male</span>
            <input
              {...register("gender")}
              value="male"
              type="radio"
              className="radio w-5 h-5 checked:bg-[white] checked:!border-[#615EF0] transition-all checked:border-[5px] !shadow-none border-slate-900 border-2"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label gap-2 cursor-pointer">
            <span className="label-text text-[#121212]">Female</span>
            <input
              {...register("gender")}
              value="female"
              type="radio"
              className="radio w-5 h-5 checked:bg-[white] checked:!border-[#615EF0] transition-all checked:border-[5px] !shadow-none border-slate-900 border-2"
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
