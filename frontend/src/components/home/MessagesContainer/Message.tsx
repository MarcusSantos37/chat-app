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
  const bubbleColors = fromMe
    ? "bg-[#615EF0] text-white"
    : "bg-[#F1F1F1] text-black";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble pt-3 text-sm ${bubbleColors} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer mt-0.5 text-xs flex gap-1 items-center">
        {dayjs(message.createdAt).format("HH:mm")}
      </div>
    </div>
  );
};

export default Message;
