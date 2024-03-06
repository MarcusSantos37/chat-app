import { useConversations } from "../../../hooks/useConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loadingConversations, conversations } = useConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations?.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          isLast={idx === conversations.length - 1}
        />
      ))}

      {loadingConversations ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
