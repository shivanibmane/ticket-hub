
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IoTicketOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase/firebase";
import { useNavigate } from "react-router";



const AppSidebar = () => {
  const navigate = useNavigate()


  const handleSignOut = async () => {
    await signOut(auth)
    navigate("/signin")
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="cursor-pointer"><IoTicketOutline /><span >Tickets</span></div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild >
                  <div className="cursor-pointer" onClick={handleSignOut}><CiLogout />
                    <span >Logout</span></div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
