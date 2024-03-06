import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../../hooks/useAuth";

const LogoutButton = () => {
  const { isLoadingLogout, logout } = useAuth();

  return (
    <div className="mt-auto">
      <div onClick={logout} className="text-white cursor-pointer">
        {isLoadingLogout ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <BiLogOut size={24} />
        )}
      </div>
    </div>
  );
};

export default LogoutButton;
