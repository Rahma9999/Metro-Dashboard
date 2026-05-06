import React, { useState } from 'react';
import { TypeController } from '../../controllers/TypeController';
import { Form, Alert, Button, Spinner } from 'react-bootstrap';

const TYPES_CATEGORY = ["public", "students", "military", "Elderly", "special", "special needs"];
const TYPES_DURATION = ["monthly", "quarterly", "half yearly", "yearly"];
const NO_OF_ZONES = 4;

function CreateSubType({ onHide }) {
    const { createSubType } = TypeController();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        category: 'public',
        zones: '',
        duration: 'monthly',
        prices: '',
    });

    const handleChange = (e) => {
        const { name , value } = e.target;
        setFormData((prev) => ({
                ...prev,
                [name]: value ?? ""
            }));
        };
        
        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            console.log('res of type: ', formData);
        
        const typePrices = Number(formData.prices);
        const typeCat = formData.category;
        const typeDuration = formData.duration;
        const typeZones = Number(formData.zones);
        
        if (!typeCat || !TYPES_CATEGORY.includes(typeCat))
            return setError("Choose a valid category from the available options.");

        if (!typeDuration || !TYPES_DURATION.includes(typeDuration))
            return setError("Choose a valid duration from the available options.");
        
        if (!typeZones || typeZones < 0 || typeZones > NO_OF_ZONES)
            return setError("Enter a valid zones.");

        if (!typePrices || typePrices <= 0)
            return setError("Enter a valid prices.");

        setLoading(true);
        try{
            await createSubType({
                zones: Number(typeZones),
                category: typeCat, 
                duration: typeDuration,
                prices: Number(typePrices)
            });

            setFormData({
                category: '',
                zones: -1,
                duration: '',
                prices: '',
            });
            onHide();
        }catch(err){
            setError(err.message || "Failed to create subsription type");
        }finally { 
            setLoading(false);
        }
    } 

    return (
        <div className='container w-100'>
            <h1 className='txtTitle my-4'>Create a new subscription type</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label className='label txtLabel'>Type Category</Form.Label>
                <Form.Select name="category" value={formData.category} onChange={handleChange}>
                    {
                        TYPES_CATEGORY.map((cat) => {
                            return(
                            <option key={cat} value={cat}>{cat}</option>
                        )})
                    }
                </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label className='label txtLabel'>Type Duration</Form.Label>
                <Form.Select name="duration" value={formData.duration} onChange={handleChange}>
                    {
                        TYPES_DURATION.map((dur) => {
                            return(
                            <option key={dur} value={dur}>{dur}</option>
                        )})
                    }
                </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label className='label txtLabel'>Type Zones</Form.Label>
                <Form.Control type="number" name="zones" value={formData.zones} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label className='label txtLabel'>Type Prices</Form.Label>
                <Form.Control type="number" name='prices' value={formData.prices} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit" className='mb-3'  disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : "Create"}
                </Button>
            </Form>
        </div>
    )
}

export default CreateSubType
