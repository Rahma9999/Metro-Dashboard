import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import '../../styles/StylePages.css';
import { Spinner, Button, Alert } from 'react-bootstrap';
import { TicketController } from '../../controllers/TicketController';
import DBModal from '../../component/DBModal.js';
import { FaSync } from 'react-icons/fa';
import { AppLoader } from '../../component/AppLoader.js';

function Ticket() {
    const { getTickets, deleteTicket } = TicketController();
    const theme = localStorage.getItem('app-theme') || 'light';
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [mode, setMode] = useState('');

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
        <AppLoader />
        );

    return (
        <div className='container my-4 w-100'>
            <h2 className='txtTitle'>Tickets Management</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <DBModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                mode={mode}
                id={selectedTicketId}
            />

            <Button className='btn mx-2' variant="outline-secondary" onClick={fetchtickets} disabled={loading}>
                <FaSync className={loading ? 'spin' : ''} />
            </Button>
            
            <Button className='btn me-1' onClick={() => {
                    setMode('createTicket');
                    setModalShow(true);}
                    }>
                Add new ticket
            </Button>  

            <div className="container-fluid mt-4">
                <Table bordered className='ticketTable mw-100' variant={theme}>
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
                                <Button className='btn me-1' onClick={() => {
                                        setSelectedTicketId(ticket._id);
                                        setMode('editTicket');
                                        setModalShow(true);}
                                        }>
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
