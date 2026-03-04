import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { TicketController } from './TicketController';

function EditTicket() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateTicket, getTicket } = TicketController();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        price: '',
        no_of_stations: '',
    });

    const handleChange = (e) => {
        const { name , value } = e.target;
        setFormData((prev) => ({
                ...prev,
                [name]: Number(value) ?? ""
            }));
        };

    useEffect(() => {
        const fetchTicket = async () => {
            setError('');
            setLoading(true);
            try{
                const ticket = await getTicket(id);
                setFormData({
                    price: ticket.price,
                    no_of_stations: ticket.no_of_stations,
                });
            }catch(err){
                setError(err.message || "Failed to load ticket");
            }finally {
                setLoading(false);
            }
        }
        
        fetchTicket();
    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const ticketPrice = Number(formData.price);
        const noOfStations = Number(formData.no_of_stations);

        if (!noOfStations || noOfStations <= 0)
            return setError("Enter valid number of stations.");

        if (!ticketPrice || ticketPrice <= 0)
            return setError("Enter valid price.");

        setLoading(true);
        try{
            await updateTicket(id, {
                price: ticketPrice, 
                no_of_stations: noOfStations,
            });

            setFormData({
                price: '',
                no_of_stations: ''
            });
            navigate('/ticket');
        }catch(err){
            setError(err.message || "Failed to update ticket");
        }finally { 
            setLoading(false);
        }
    } 

    return (
        <div className='container w-100'>
            <h1 className='txtTitle my-4'>Create a new station</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label className='label'>Number of staions</Form.Label>
                <Form.Control type="number" name="no_of_stations" value={formData.no_of_stations} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label className='label'>Price</Form.Label>
                <Form.Control type="number" name='price' value={formData.price} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" className='mb-3'  disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : "Update"}
                </Button>
            </Form>
        </div>
    )
}

export default EditTicket
