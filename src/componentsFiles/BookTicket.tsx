import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { collection, addDoc } from "firebase/firestore"
import { db } from "./Firebase/firebase"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Checkbox } from "@/components/ui/checkbox"


const BookTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [date, setDate] = useState("")
  const [document, setDocument] = useState("")
  const [priority, setPriority] = useState("")
  const [noOfTicket, setNoOfTicket] = useState("")
  const [isCondition, setIsCondition] = useState(false)
  const [createdBy, setCreatedBy] = useState("Agent")
  const { toast } = useToast()


  const submitFrom = async (e) => {
    e.preventDefault();
    if (email && description === "") { return }
    else if (phoneNo && date === "") { return }
    else if (document === "" && noOfTicket === "") { return }
    try {
      const tickets = await addDoc(collection(db, 'tickets'), {
        ticketId: new Date(),
        title: title,
        ticketNo: noOfTicket,
        desc: description,
        email: email,
        password: password,
        phoneNo: phoneNo,
        date: date,
        document: document,
        priority: priority,
        createdBy: createdBy
      })
      console.log(tickets)
      setTitle("")
      setNoOfTicket("")
      setDescription("")
      setEmail("")
      setPassword("")
      setPhoneNo("")
      setDate("")
      setDocument("")
      setPriority("")
      toast({
        description: "Book the ticket successfully",
      })

    } catch (e) {
      toast({
        variant: "destructive",
        description: "Fiald to book the ticket",
      })
    }

  }
  return (
    <>
      <Dialog >
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-5 mx-7">Book Ticket</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" >
          <DialogHeader>
            <DialogTitle>Book Ticket</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-3">
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="title" className="text-left">Ticket Title</Label>
              <Input type="text" id="title" className="col-span-2" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="notickets" className="text-left">Tickets No.</Label>
              <Input type="number" id="notickets" className="col-span-3" value={noOfTicket} onChange={(e) => setNoOfTicket(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="email" className="text-left">Email</Label>
              <Input type="email" id="email" className="col-span-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="password" className="text-left">Password</Label>
              <Input type="password" id="password" className="col-span-3" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="number" className="text-left">Phone No.</Label>
              <Input type="number" id="number" className="col-span-3" max={10} required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} maxLength={10} />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="date" className="text-left" >Date</Label>
              <Input type="date" id="date" className="col-span-3" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="category" className="text-left" >Priority</Label>
              <select className=" col-span-3 border border-spacing-1 py-2 rounded-lg outline-none" value={priority} onChange={(e) => setPriority(e.target.value)} >
                <option value="Low" >Low</option>
                <option value="Meduim" >Medium</option>
                <option value="High" >High</option>
              </select>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="category" className="text-left" >Create by</Label>
              <select className="col-span-4 border border-spacing-1 py-2 rounded-lg outline-none" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} >
                <option value="Agent" >Agent</option>
                <option value="Customer" >Customer</option>

              </select>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Label htmlFor="attachment" className="text-left" >Attachment</Label>
              <Input type="file" id="attachment" className="col-span-3" value={document} onChange={(e) => setDocument(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor="desc" className="text-left">Description</Label>
            <textarea aria-describedby="title" id="desc" className="col-span-3 border-gray-400 border outline-none px-2 py-2 text-sm rounded-sm" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="flex items-center space-x-2" >
            <Checkbox id="terms" onClick={() => setIsCondition(!isCondition)} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              aria-disabled
            >
              Accept terms and conditions
            </label>
          </div>
          <DialogFooter>
            {isCondition ? <Button onClick={submitFrom}>Book</Button> : <Button disabled>Book</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog >
      <Toaster />
    </>
  )
}

export default BookTicket;

