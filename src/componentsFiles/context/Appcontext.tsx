import { onAuthStateChanged } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../Firebase/firebase"


export const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true)
        setCurrentUser(user)
      }
    })
    return unsubscribe
  }, [])
  console.log(auth)
  const value = { isUser, currentUser, }

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>

}

export default AppProvider;