import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import BookTicket from "./BookTicket"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { GrView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PAGE_SIZE } from "./constant";
import TicketsPagination from "./TicketsPagination";



const TicketsDetails = () => {

  const [ticketsData, setTicketsData]: any = useState([]);
  const [currentPage, setCurrentPage] = useState(0)


  const fetchTicketsDoc = async () => {
    try {
      const data = await getDocs(collection(db, "tickets"));
      const ticketsArray: any = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTicketsData(ticketsArray);
      console.log(data)
    } catch (err) {
      console.log("Faild to fetch tickets data", err);
    }
  };

  useEffect(() => {
    fetchTicketsDoc();
  }, []);

  const totalTickets = ticketsData.length
  const noOfPages = Math.ceil(totalTickets / PAGE_SIZE)
  const start = currentPage * PAGE_SIZE
  const end = start + PAGE_SIZE

  return (
    <>
      <div className="flex flex-col w-11/12 ml-5">
        <div className="flex w-11/12 justify-between items-center mt-8 mb-2 ">
          <h2 className="text-lg font-semibold">Tickets</h2>
          <div ><BookTicket /></div>
        </div>
        <Table className="w-11/12 ">
          <TableHeader >
            <TableRow >
              <TableHead>Ticket ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >{ticketsData?.slice(start, end).map((ticket: any) => (<TableRow key={ticket.id}>
            <TableCell className="py-3">{ticket.id}</TableCell>
            <TableCell className="py-3">{ticket.title}</TableCell>
            <TableCell className="py-3">{ticket.desc}</TableCell>
            <TableCell className="py-3">{ticket.priority}</TableCell>
            <TableCell className="py-3">{ticket.createdBy}</TableCell>
            <TableCell className="flex gap-4 text-lg"><GrView /><FaEdit /><MdDelete />
            </TableCell>
          </TableRow>))}</TableBody>
        </Table>
        <div className="my-7 mx-auto flex">
          <TicketsPagination setCurrentPage={setCurrentPage} noOfPages={noOfPages} currentPage={currentPage} />
        </div>
      </div>

    </>

  )
}

export default TicketsDetails
