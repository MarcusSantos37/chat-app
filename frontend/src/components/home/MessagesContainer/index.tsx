import { IoChatbubblesSharp } from "react-icons/io5";
import { useAuth } from "../../../hooks/useAuth";
import { useSocket } from "../../../hooks/useSocket";
import useConversation from "../../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

interface MessagesContainerProps {
  setIsOpen: (value: boolean) => void;
}

const MessagesContainer = ({ setIsOpen }: MessagesContainerProps) => {
  const { selectedConversation } = useConversation();

  const { onlineUsers } = useSocket();

  const isOnline = selectedConversation
    ? onlineUsers?.includes(selectedConversation?._id)
    : false;

  // useEffect(() => {
  //   return () => setSelectedConversation(null);
  // }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] bg-white w-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected setIsOpen={setIsOpen} />
      ) : (
        <>
          {" "}
          <div className="flex bg-white gap-2 items-center border-b px-5 py-4">
            <div className="avatar">
              <div className="w-12">
                <img src={selectedConversation.profilePic} alt="user avatar" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-semibold text-black">
                {selectedConversation.fullName}
              </p>
              {isOnline && (
                <div className="flex flex-row text-black items-center gap-1 text-xs font-semibold">
                  <div className="w-2 h-2 bg-[#00A96E] rounded-full"></div>
                  <span>Online</span>
                </div>
              )}
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessagesContainer;

interface NoChatSelectedProps {
  setIsOpen: (value: boolean) => void;
}

const NoChatSelected = ({ setIsOpen }: NoChatSelectedProps) => {
  const { authUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="px-4 text-center text-black flex flex-col items-center gap-1 mb-3">
        <p className="text-2xl font-semibold">Welcome {authUser?.fullName}!</p>
        <p className="text-sm">Select a chat to start messaging</p>
      </div>
      <div
        onClick={() => setIsOpen(true)}
        className="z-[999] sm:pointer-events-none hover:brightness-110 transition-all mr-3 rounded-full p-3 bg-[#615EF0] text-white cursor-pointer"
      >
        <IoChatbubblesSharp size={24} />
      </div>
    </div>
  );
};
