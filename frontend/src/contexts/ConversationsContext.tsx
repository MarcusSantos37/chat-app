import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { ConversationData, MessageData } from "../types/conversations";
import useConversation from "../zustand/useConversation";

interface ConversationsContextProps {
  conversations: ConversationData[];
  loadingConversations: boolean;
  loadingSendMessage: boolean;
  loadingMessages: boolean;
  sendMessage: (message: string) => Promise<void>;
  messages: MessageData[];
}

export const ConversationsContext = createContext(
  {} as ConversationsContextProps
);

interface ConversationsContextProviderProps {
  children: ReactNode;
}

export const ConversationsContextProvider = ({
  children,
}: ConversationsContextProviderProps) => {
  const { authUser } = useAuth();

  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingSendMessage, setLoadingSendMessages] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [conversations, setConversations] = useState([]);

  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    setLoadingSendMessages(true);
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedConversation?._id}`,
        {
          message,
        }
      );

      if (data.error) {
        toast.error(data.error);
      } else {
        setMessages([...messages, data]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSendMessages(false);
    }
  };

  useEffect(() => {
    const getConversations = async () => {
      setLoadingConversations(true);
      try {
        const { data } = await axios.get("/api/users");

        if (data.error) {
          toast.error(data.error);
        } else {
          setConversations(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingConversations(false);
      }
    };

    if (authUser) {
      getConversations();
    }
  }, [authUser]);

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      try {
        const { data } = await axios.get(
          `/api/messages/${selectedConversation?._id}`
        );

        if (data.error) {
          toast.error(data.error);
        } else {
          setMessages(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMessages(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return (
    <ConversationsContext.Provider
      value={{
        loadingConversations,
        loadingSendMessage,
        conversations,
        sendMessage,
        loadingMessages,
        messages,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
