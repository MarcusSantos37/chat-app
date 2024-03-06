import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
      <input
        {...register("search")}
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchInput;
