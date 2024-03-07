import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsSendFill } from "react-icons/bs";
import { useConversations } from "../../../hooks/useConversations";
import { messageSchema } from "../../../schemas/conversations";
import { Message } from "../../../types/conversations";

const MessageInput = () => {
  const { loadingSendMessage, sendMessage } = useConversations();

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
          className="border-2 text-black text-sm focus-visible:outline-none transition-all focus:border-[#615EF0] rounded-[12px] block w-full py-3.5 px-5 bg-white border-[#E2E8F0]"
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 text-[#615EF0] flex items-center pe-5"
        >
          {loadingSendMessage ? (
            <span className="loading w-[18px] loading-spinner"></span>
          ) : (
            <BsSendFill size={18} />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
