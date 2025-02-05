import { SidebarTrigger } from "@/components/ui/sidebar";
import BookTicket from "./BookTicket";
const Home = () => {

  return (
    <>
      <SidebarTrigger />
      <div className="flex m-auto">
        <BookTicket />
      </div>

    </ >
  );
};

export default Home;
