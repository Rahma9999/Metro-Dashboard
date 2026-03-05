import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import '../../styles/StylePages.css';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner, Button, Alert } from 'react-bootstrap';
import { TicketController } from './TicketController';

function Ticket() {
    const navigate = useNavigate();
    const { getTickets, deleteTicket } = TicketController();

    const [tickets, setTickets] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchtickets = async () => {
        setLoading(true);
        setError('');
        try{
            const res = await getTickets();
            setTickets(res);
        }catch(err){
            setError(err.message  || 'Failed to load tickets');
        }finally{
            setLoading(false);            
        }
    }

    useEffect(() => {
        fetchtickets();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this ticket?")) return;
        setLoading(true);
        try {
            await deleteTicket(id);
            fetchtickets(); 
        } catch (err) {
        setError(err.message || "Failed to delete ticket");
        } finally {
        setLoading(false);
        }
    };

    if(loading) return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <Spinner animation="border" variant="dark" />
        </div>
        );

    return (
        <div className='container my-4 w-100'>
            <h2 className='txtTitle'>ticket Records</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            
            <Link to='/ticket/create' className='btn btn-primary me-1'>
                Add new ticket
            </Link>
            <Button className='btn' onClick={fetchtickets}>Refresh</Button>
            <div className="container-fluid mt-4">
                <Table bordered className='ticketTable mw-100 '>
                <thead>
                    <tr>
                    <th>Number of stations</th>
                    <th>price</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket._id}>
                            <td>{ticket.no_of_stations}</td>
                            <td>{ticket.price}</td>
                            <td>
                                <Button className='btn me-1' onClick={() => navigate(`/ticket/edit/${ticket._id}`)}>
                                    Edit
                                </Button>
                                <Button className='btn me-1' onClick={() => handleDelete(ticket._id)}>
                                    Delete
                                </Button>                            
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Ticket
