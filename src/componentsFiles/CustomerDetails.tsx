import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import BookTicket from "./BookTicket"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const CustomerDetails = () => {

  const [ticketsData, setTicketsData] = useState(null);
  console.log(ticketsData);

  useEffect(() => {
    const fetchTicketsDoc = async () => {
      try {
        const data = await getDocs(collection(db, "tickets"));
        const ticketsArray = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTicketsData(ticketsArray);
      } catch (err) {
        console.log("Faild to fetch tickets data", err);
      }
    };
    fetchTicketsDoc();
  }, []);
  return (
    <div className="flex flex-col w-11/12">
      <div className="flex justify-between">
        <h2>Tickets</h2>
        <BookTicket />
      </div>
      <Table className="w-11/12">
        <TableHeader >
          <TableRow >
            <TableHead>Ticket Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{ticketsData?.map((ticket) => (<TableRow key={ticket.id}>
          <TableCell>{ticket.id}</TableCell>
          <TableCell>{ticket.title}</TableCell>
          <TableCell>{ticket.desc}</TableCell>
          <TableCell>{ticket.priority}</TableCell>
          <TableCell className="flex gap-4 text-lg"><GrView /><FaEdit /><MdDelete />
          </TableCell>
        </TableRow>))}</TableBody>
      </Table>
    </div>

  )
}

export default CustomerDetails
