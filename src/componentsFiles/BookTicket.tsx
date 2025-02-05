import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { collection, addDoc } from "firebase/firestore"
import { db } from "./Firebase/firebase"
import { useState } from "react"

const BookTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [date, setDate] = useState("")
  const [document, setDocument] = useState("")
  const [priority, setPriority] = useState("Low")


  const submitFrom = async (e) => {
    e.preventDefault();
    if (email && description === "") { return }
    else if (phoneNo && date === "") { return }
    else if (document === "" && priority === "Low") { return }
    try {
      const tickets = await addDoc(collection(db, 'tickets'), {
        ticketId: new Date(),
        title: title,
        desc: description,
        email: email,
        phoneNo: phoneNo,
        date: date,
        document: document,
        priporty: priority
      })
      console.log("Ticket ID:", tickets.id)
      setTitle("")
      setDescription("")
      setEmail("")
      setPhoneNo("")
      setDate("")
      setDocument("")
      setPriority("")
    } catch (e) {
      console.log("Error:", e)
    }

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Book Ticket</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader>
          <DialogTitle>Book Ticket</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left">Ticket Title</Label>
            <Input type="text" id="title" className="col-span-3" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">Email</Label>
            <Input type="email" id="email" className="col-span-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number" className="text-left">Phone No.</Label>
            <Input type="number" id="number" className="col-span-3" max={10} required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} maxLength={10} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-left" >Date</Label>
            <Input type="date" id="date" className="col-span-3" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="attachment" className="text-left" >Attachment</Label>
            <Input type="file" id="attachment" className="col-span-3" value={document} onChange={(e) => setDocument(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-left" >Prority</Label>
            <select className="col-span-3 border border-spacing-1 py-2 rounded-lg outline-none" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-left">Description</Label>
            <Input type="text" id="desc" className="col-span-3" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submitFrom}>Book</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}

export default BookTicket;

