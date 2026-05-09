import React, { useState } from 'react';
import { TicketController } from '../../controllers/TicketController';
import { Form, Alert, Button, Spinner } from 'react-bootstrap';

function CreateTicket({ onHide }) {
    const { createTicket } = TicketController();

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
            await createTicket({
                ticketPrice, 
                noOfStations,
            });

            setFormData({
                price: '',
                no_of_stations: ''
            });
            onHide();
        }catch(err){
            setError(err.message || "Failed to create ticket");
        }finally { 
            setLoading(false);
        }
    } 

    return (
        <div className='container w-100'>
            <h1 className='txtTitle my-4'>Create a new ticket</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label className='label txtLabel'>Number of staions</Form.Label>
                <Form.Control type="number" name="no_of_stations" value={formData.no_of_stations} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label className='label txtLabel'>Price</Form.Label>
                <Form.Control type="number" name='price' value={formData.price} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" className='mb-3'  disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : "Create"}
                </Button>
            </Form>
        </div>
    )
}

export default CreateTicket
