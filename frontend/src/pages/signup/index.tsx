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
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-600">ChatApp</span>
        </h1>
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
            label="Password"
            placeholder="Confirm Password"
            errorMessage={errors.confirmPassword?.message}
          />
          <GenderCheckbox
            errorMessage={errors.gender?.message}
            register={register}
          />
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mx-auto my-5 inline-block w-full text-center"
          >
            Already have an account?
          </Link>
          <div>
            <button disabled={isLoadingSignup} className="btn btn-block btn-sm">
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
