import { useSocket } from "../../../hooks/useSocket";
import { ConversationData } from "../../../types/conversations";
import useConversation from "../../../zustand/useConversation";

interface ConversationProps {
  conversation: ConversationData;
  isLast: boolean;
}

const Conversation = ({ conversation, isLast }: ConversationProps) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocket();

  const isOnline = onlineUsers?.includes(conversation._id);

  return (
    <>
      <div
        className={`${
          isSelected ? "bg-sky-500" : ""
        } flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-semibold text-gray-200">{conversation.fullName}</p>
        </div>
      </div>

      {!isLast && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
