import { useEffect, useState } from "react";
import { IoChatbubblesSharp } from "react-icons/io5";
import MessagesContainer from "../../components/home/MessagesContainer";
import Sidebar from "../../components/home/Sidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const { selectedConversation } = useConversation();

  useEffect(() => {
    if (selectedConversation) {
      setIsOpenSidebar(false);
    }

    return () => setIsOpenSidebar(false);
  }, [selectedConversation]);

  return (
    <div className="flex h-full w-full justify-center overflow-hidden">
      {!isOpenSidebar && selectedConversation && (
        <div
          onClick={() => setIsOpenSidebar(true)}
          className="fixed z-[999] sm:hidden hover:brightness-110 transition-all right-0 top-0 mt-4 mr-3 rounded-full p-3 bg-[#615EF0] text-white cursor-pointer"
        >
          <IoChatbubblesSharp size={24} />
        </div>
      )}
      <Sidebar isOpen={isOpenSidebar} setIsOpen={setIsOpenSidebar} />
      {!isOpenSidebar && <MessagesContainer setIsOpen={setIsOpenSidebar} />}
    </div>
  );
};

export default Home;
