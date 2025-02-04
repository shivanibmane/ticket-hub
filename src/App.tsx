import { SidebarProvider } from "./components/ui/sidebar"
import AppSidebar from "./componentsFiles/AppSidebar"
import Home from "./componentsFiles/Home"

function App() {

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Home />
      </SidebarProvider>
    </>
  )
}

export default App