import { IoChatbubbles } from "react-icons/io5";
import { useAuth } from "../../../hooks/useAuth";
import { useSocket } from "../../../hooks/useSocket";
import useConversation from "../../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessagesContainer = () => {
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
        <NoChatSelected />
      ) : (
        <>
          {" "}
          <div className="flex bg-white gap-2 items-center border-b mb-5 last:mb-0 px-5 py-4">
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

const NoChatSelected = () => {
  const { authUser } = useAuth();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser?.fullName}!</p>
        <p>Select a chat to start messaging</p>
        <IoChatbubbles size={55} />
      </div>
    </div>
  );
};
