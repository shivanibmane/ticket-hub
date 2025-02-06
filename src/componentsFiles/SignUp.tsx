import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "./Firebase/firebase"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()
  const { toast } = useToast()


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/")
      }
    })
    return unsubscribe
  }, [])

  const createUser = async (e) => {
    e.preventDefault()
    try {
      if (email && password !== "") {
        await createUserWithEmailAndPassword(auth, email, password, userName)
        toast({
          description: "Create user successfully",
        })
      }
      navigate("/")

    } catch (e) {
      console.log(e)
      toast({
        variant: "destructive",
        description: "Failed to create user",
      })
    }
    setEmail("")
    setPassword("")
    setUserName("")
  }

  return (
    <div className="w-11/12 sm:w-7/12 md:w-4/12 my-12 mx-auto border border-gray-300 rounded-lg">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">

            <div>
              <Label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                User Name
              </Label>
              <div className="mt-2">
                <Input
                  id="username"
                  type="text"
                  required
                  autoComplete="off"
                  className="block w-full rounded-md bg-white px-3 py-1.5 "
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
              </Label>
              <div className="mt-2">
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="off"
                  className="block w-full rounded-md bg-white px-3 py-1.5 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </Label>

              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  type="password"
                  required
                  autoComplete="off"
                  className="block w-full rounded-md bg-white px-3 py-1.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="w-full "
                onClick={createUser}
              >
                Sign Up
              </Button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="font-semibold text-black">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default SignUp
