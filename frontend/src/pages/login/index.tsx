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
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-600">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
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
            className="text-sm hover:underline hover:text-blue-600 mx-auto my-5 inline-block w-full text-center"
          >
            Don't have an account?
          </Link>
          <div>
            <button className="btn btn-block btn-sm ">
              {isLoadingLogin ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
