import { useContext } from "react";
import { ConversationsContext } from "../contexts/ConversationsContext";

export const useConversations = () => {
  return useContext(ConversationsContext);
};
