import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsSend } from "react-icons/bs";
import { useConversations } from "../../../hooks/useConversations";
import { messageSchema } from "../../../schemas/conversations";
import { Message } from "../../../types/conversations";

const MessageInput = () => {
  const { sendMessage } = useConversations();

  const { register, handleSubmit, setValue, watch } = useForm<Message>({
    resolver: yupResolver(messageSchema),
  });

  const onSubmit: SubmitHandler<Message> = async ({ message }: Message) => {
    if (!watch("message")) return;

    await sendMessage(message);
    setValue("message", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-4 my-3">
      <div className="w-full relative">
        <input
          {...register("message")}
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
