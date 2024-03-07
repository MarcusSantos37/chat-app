import { IoExit } from "react-icons/io5";
import { useAuth } from "../../../hooks/useAuth";

const LogoutButton = () => {
  const { isLoadingLogout, logout } = useAuth();

  return (
    <div className="mt-auto">
      <div
        onClick={logout}
        className="text-white flex py-3 gap-2 items-center justify-center bg-red-500 cursor-pointer transition-opacity hover:opacity-80"
      >
        <span className="text-sm font-medium">Logout</span>
        {isLoadingLogout ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <IoExit size={24} />
        )}
      </div>
    </div>
  );
};

export default LogoutButton;
