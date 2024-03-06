import { create } from "zustand";
import { ConversationData, MessageData } from "../types/conversations";

type ConversationState = {
  selectedConversation: ConversationData | null;
  setSelectedConversation: (
    selectedConversation: ConversationData | null
  ) => void;
  messages: MessageData[];
  setMessages: (messages: MessageData[]) => void;
};

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
