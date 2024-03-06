import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import { toast } from "react-toastify";
import { LoginInputs, SignupInputs } from "../types/auth";

type User = {
  _id: string;
  fullName: string;
  profilePic: string;
  username: string;
};

interface AuthContextProps {
  signup: (values: SignupInputs) => Promise<void>;
  login: (values: LoginInputs) => Promise<void>;
  logout: () => Promise<void>;
  isLoadingSignup: boolean;
  isLoadingLogout: boolean;
  isLoadingLogin: boolean;
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const storedUser = localStorage.getItem("chat-user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const [authUser, setAuthUser] = useState<User | null>(parsedUser);

  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const signup = async (values: SignupInputs) => {
    setIsLoadingSignup(true);

    try {
      const { data } = await axios.post("/api/auth/signup", {
        ...values,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSignup(false);
    }
  };

  const login = async (values: LoginInputs) => {
    setIsLoadingLogin(true);
    try {
      const { data } = await axios.post("/api/auth/login", {
        ...values,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const logout = async () => {
    setIsLoadingLogout(true);

    try {
      const { data } = await axios.post("/api/auth/logout");

      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.removeItem("chat-user");
        setAuthUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingLogout(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        logout,
        login,
        isLoadingLogin,
        isLoadingSignup,
        isLoadingLogout,
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
