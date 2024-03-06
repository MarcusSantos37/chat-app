import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="border-r min-w-[350px] bg-white flex flex-col">
      <div className="flex items-center justify-between px-5 py-[26px] mb-5 border-b">
        <p className="font-semibold text-xl text-black">Chats</p>
        <LogoutButton />
      </div>
      <div className="px-5 pb-5">
        <SearchInput />
        <Conversations />
      </div>
    </div>
  );
};

export default Sidebar;
