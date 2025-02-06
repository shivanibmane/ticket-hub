import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import BookTicket from "./BookTicket"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const TicketsDetails = () => {

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
    <div className="flex flex-col w-11/12 ml-5">
      <div className="flex w-11/12 justify-between items-center mt-8 mb-2 ">
        <h2 className="text-lg font-semibold">Tickets</h2>
        <div ><BookTicket /></div>
      </div>
      <Table className="w-11/12 ">
        <TableHeader >
          <TableRow >
            <TableHead>Ticket Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{ticketsData?.map((ticket) => (<TableRow key={ticket.id}>
          <TableCell>{ticket.id}</TableCell>
          <TableCell>{ticket.title}</TableCell>
          <TableCell>{ticket.desc}</TableCell>
          <TableCell>{ticket.priority}</TableCell>
          <TableCell>{ticket.createdBy}</TableCell>
          <TableCell className="flex gap-4 text-lg"><GrView /><FaEdit /><MdDelete />
          </TableCell>
        </TableRow>))}</TableBody>
      </Table>
    </div>

  )
}

export default TicketsDetails
