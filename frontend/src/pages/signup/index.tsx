import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import GenderCheckbox from "../../components/signup/GenderCheckbox";
import { useAuth } from "../../hooks/useAuth";
import { signupSchema } from "../../schemas/auth";
import { SignupInputs } from "../../types/auth";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({
    resolver: yupResolver(signupSchema),
  });

  const { isLoadingSignup, signup } = useAuth();

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    await signup(data);
  };

  return (
    <div className="flex flex-col sm:min-w-[450px] min-w-[360px] items-center justify-center mx-auto">
      <div className="w-full p-6 rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-[#121212]">
          Sign Up <span className="text-[#615EF0]">ChatApp</span>
        </h1>
        <p className="text-[#3D3D3D] text-sm text-center my-5">
          Create your account to join the chat!
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
          <CustomInput
            register={register}
            type="text"
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            errorMessage={errors.fullName?.message}
          />
          <CustomInput
            register={register}
            type="text"
            name="username"
            label="Username"
            placeholder="johndoe"
            errorMessage={errors.username?.message}
          />
          <CustomInput
            register={register}
            type="password"
            name="password"
            label="Password"
            placeholder="Enter password"
            errorMessage={errors.password?.message}
          />
          <CustomInput
            register={register}
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            errorMessage={errors.confirmPassword?.message}
          />
          <GenderCheckbox
            errorMessage={errors.gender?.message}
            register={register}
          />
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-[#615EF0] transition-all text-[#121212] mx-auto my-5 inline-block w-full text-center"
          >
            Already have an account?
          </Link>
          <div>
            <button
              disabled={isLoadingSignup}
              className="btn btn-block text-white bg-[#615EF0] hover:bg-[#615EF0] hover:opacity-80 border-none"
            >
              {isLoadingSignup ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
