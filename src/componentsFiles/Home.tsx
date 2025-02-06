import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import TicketsDetails from "./TicketsDetails";
import AppSidebar from "./AppSidebar";

const Home = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <TicketsDetails />
      </SidebarProvider>
    </>
  );
};

export default Home;
