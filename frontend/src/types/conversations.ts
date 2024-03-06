export type ConversationData = {
  createdAt: string;
  fullName: string;
  gender: string;
  profilePic: string;
  updatedAt: string;
  username: string;
  _id: string;
};

export type Message = {
  message: string;
};

export type MessageData = {
  createdAt: string;
  message: string;
  receiverId: string;
  senderId: string;
  updatedAt: string;
  _id: string;
};
