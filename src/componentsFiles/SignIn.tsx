import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { auth } from './Firebase/firebase'
import { Toaster } from '@/components/ui/toaster'

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { toast } = useToast()


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        return
      }
    })
    return unsubscribe
  }, [])

  const handleUserLogin = async (e) => {
    e.preventDefault()
    console.log("click")
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({
        description: "Login successfully",
      })
      navigate("/")
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Failed to user login",
      })
    }
    setEmail("")
    setPassword("")

  }
  return (
    <div className="w-11/12 sm:w-7/12 md:w-4/12 my-12 mx-auto border border-gray-300">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign In with your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
              </Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="off"
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
                  name="password"
                  type="password"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5  sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className=" w-full "
                onClick={handleUserLogin}
              >
                Sign In
              </Button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Create an account?{" "}
            <Link to="/signup" className="font-semibold text-black">
              Click here
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default SignIn
