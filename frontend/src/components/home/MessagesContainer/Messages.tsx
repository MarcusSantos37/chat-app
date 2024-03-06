import { useEffect, useRef } from "react";
import { useConversations } from "../../../hooks/useConversations";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { loadingMessages, messages } = useConversations();

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loadingMessages &&
        messages.length > 0 &&
        messages.map((message) => (
          <div ref={lastMessageRef} key={message._id}>
            <Message message={message} />
          </div>
        ))}

      {loadingMessages && [
        ...Array(3).map((_, idx) => <MessageSkeleton key={idx} />),
      ]}

      {!loadingMessages && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
