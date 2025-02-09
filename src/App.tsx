
import { useContext } from "react"
import Home from "./componentsFiles/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppContext } from "./componentsFiles/context/Appcontext"
import SignUp from "./componentsFiles/SignUp"
import SignIn from "./componentsFiles/SignIn"



const AppContent = () => {
  const { currentUser }: any = useContext(AppContext)
  return currentUser ? <Home /> : <SignIn />
}
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App