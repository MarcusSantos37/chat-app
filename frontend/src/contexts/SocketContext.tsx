import { ReactNode, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";
import useConversation from "../zustand/useConversation";

import notificationSound from "../../public/sounds/notification.mp3";

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: string[] | null;
}

export const SocketContext = createContext({} as SocketContextProps);

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider = ({
  children,
}: SocketContextProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[] | null>(null);
  const { authUser } = useAuth();

  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]);

  useEffect(() => {
    if (authUser) {
      const socket = io(process.env.FRONTEND_URL ?? "", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
