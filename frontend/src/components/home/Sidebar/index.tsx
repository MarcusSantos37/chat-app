import { IoClose } from "react-icons/io5";
import useConversation from "../../../zustand/useConversation";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { selectedConversation } = useConversation();

  return (
    <div
      className={` ${
        isOpen ? "flex w-full" : "sm:flex hidden border-r"
      } min-w-[350px] bg-white flex-col`}
    >
      <div className="flex items-center justify-between px-5 py-[26px] mb-5 border-b">
        <p className="font-semibold text-xl text-black">Chats</p>
        {selectedConversation && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed z-[999] sm:hidden hover:brightness-110 transition-all right-0 top-0 mt-4 mr-3 rounded-full p-3 bg-[#615EF0] text-white cursor-pointer"
          >
            <IoClose size={24} />
          </div>
        )}
      </div>
      <div className="px-5 pb-5">
        <SearchInput />
        <Conversations />
      </div>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
