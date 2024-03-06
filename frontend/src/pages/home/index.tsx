import MessagesContainer from "../../components/home/MessagesContainer";
import Sidebar from "../../components/home/Sidebar";

const Home = () => {
  return (
    <div className="flex h-full w-full justify-center overflow-hidden">
      <Sidebar />
      <MessagesContainer />
    </div>
  );
};

export default Home;
