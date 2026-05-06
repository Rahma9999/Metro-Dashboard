import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { TypeController } from '../../controllers/TypeController';

const TYPES_CATEGORY = ["public", "students", "military", "Elderly", "special", "special needs"];
const TYPES_DURATION = ["monthly", "quarterly", "half yearly", "yearly"];
const NO_OF_ZONES = 4;

function Edittype({ id, onHide }) {
    const { updateSubType, getSubType } = TypeController();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
    category: 'public',
    duration: 'monthly',
    zones: '',
    prices: ''
});

    const handleChange = (e) => {
        const { name , value } = e.target;
        setFormData((prev) => ({
                ...prev,
                [name]: value ?? ""
            }));
        };

    useEffect(() => {
        const fetchType = async () => {
            setError('');
            setLoading(true);
            try{
                const type = await getSubType(id);
                setFormData({
                category: type.category.en,
                zones: type.zones,
                duration: type.duration.en,
                prices: type.prices,
            });
            console.log('form data: ', formData)
            console.log('type data: ', type)
            }catch(err){
                setError("Failed to load subscription type");
            }finally {
                console.log('id: ', id);
                setLoading(false);
            }
        }

        fetchType();
    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
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
            await updateSubType(id, {
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
            setError("Failed to update subscription type");
        }finally { 
            setLoading(false);
        }
    } 

    return (
        <div className='container w-100'>
            <h1 className='txtTitle my-4'>Edit The Subscription Type</h1>

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
                <Form.Select name="duration" value={formData.category} onChange={handleChange}>
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
                    {loading ? <Spinner size="sm" animation="border" /> : "Edit"}
                </Button>
            </Form>
        </div>
    )
}

export default Edittype
