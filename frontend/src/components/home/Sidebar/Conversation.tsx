import { useSocket } from "../../../hooks/useSocket";
import { ConversationData } from "../../../types/conversations";
import useConversation from "../../../zustand/useConversation";

interface ConversationProps {
  conversation: ConversationData;
  isLast: boolean;
}

const Conversation = ({ conversation }: ConversationProps) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocket();

  const isOnline = onlineUsers?.includes(conversation._id);

  return (
    <>
      <div
        className={`${
          isSelected ? "bg-[#615EF0] bg-opacity-[6%]" : ""
        } flex gap-2 items-center first:mt-3 mb-3 last:mb-0 hover:bg-[#615EF0] hover:bg-opacity-[6%] rounded-[12px] p-2 cursor-pointer`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-semibold text-black">{conversation.fullName}</p>
        </div>
      </div>
    </>
  );
};

export default Conversation;
