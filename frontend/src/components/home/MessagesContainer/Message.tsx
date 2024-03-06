import dayjs from "dayjs";
import { useAuth } from "../../../hooks/useAuth";
import { MessageData } from "../../../types/conversations";
import useConversation from "../../../zustand/useConversation";

interface MessageProps {
  message: MessageData;
}

const Message = ({ message }: MessageProps) => {
  const { authUser } = useAuth();

  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {dayjs(message.createdAt).format("HH:mm")}
      </div>
    </div>
  );
};

export default Message;
