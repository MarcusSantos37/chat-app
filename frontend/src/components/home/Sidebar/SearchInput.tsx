import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useConversations } from "../../../hooks/useConversations";
import { searchSchema } from "../../../schemas/conversations";
import useConversation from "../../../zustand/useConversation";

const SearchInput = () => {
  const { conversations } = useConversations();

  const { setSelectedConversation } = useConversation();

  const { register, handleSubmit } = useForm<{ search: string }>({
    resolver: yupResolver(searchSchema),
  });

  const onSubmit: SubmitHandler<{ search: string }> = async ({
    search,
  }: {
    search: string;
  }) => {
    const conversation = conversations.find((item) =>
      item.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-2 w-full"
    >
      <input
        {...register("search")}
        type="text"
        onSubmit={handleSubmit(onSubmit)}
        placeholder="Search..."
        className="input bg-[#F3F3F3] transition-all w-full rounded-[12px]"
      />
    </form>
  );
};

export default SearchInput;
