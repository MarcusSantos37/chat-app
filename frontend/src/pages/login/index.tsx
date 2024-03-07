import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoginInputs } from "../../types/auth";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { loginSchema } from "../../schemas/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema),
  });

  const { isLoadingLogin, login } = useAuth();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    await login(data);
  };

  return (
    <div className="sm:min-w-[450px] min-w-[360px] m-auto">
      <div className="flex flex-col p-6 rounded-lg items-center justify-center">
        <h1 className="text-3xl font-semibold text-center text-[#121212]">
          Login <span className="text-[#615EF0]">ChatApp</span>
        </h1>
        <p className="text-[#3D3D3D] text-center text-sm my-5">
          Enter your username and password to access the chat
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5 w-full">
          <CustomInput
            register={register}
            type="text"
            name="username"
            label="Username"
            placeholder="Enter username"
            errorMessage={errors.username?.message}
          />
          <CustomInput
            register={register}
            type="password"
            name="password"
            label="Password"
            placeholder="Enter password"
            errorMessage={errors.username?.message}
          />
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-[#615EF0] transition-all text-[#121212] mx-auto my-5 inline-block w-full text-center"
          >
            Don't have an account?
          </Link>
          <div>
            <button className="btn btn-block text-white bg-[#615EF0] hover:bg-[#615EF0] hover:opacity-80 border-none">
              {isLoadingLogin ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
