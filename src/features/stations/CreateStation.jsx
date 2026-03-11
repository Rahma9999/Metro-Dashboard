import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import '../../styles/StylePages.css';
import { StationController } from './StationController';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';

function CreateStation() {
    const navigate = useNavigate();
    const { createStation } = StationController();
    
    const [name, setName] = useState('');
    const [position, setPosition] = useState(-1);
    const [line, setLine] = useState('');
    const [isTransfer, setIsTransfer] = useState(false);
    const [transferPosition, setTransferPosition] = useState(-1);
    const [transferLine, setTransferLine] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if(!name.trim()) return setError("Enter name station.");
        if(position <= 0) return setError("Enter valid position.");
        if(!line) return setError("Select valid line")
        if (isTransfer) {
            if (!transferPosition)
                return setError("Enter transfer position.");
            if (!transferLine)
                return setError("Select transfer line.");
            }

        setLoading(true);

///////////// problem: each station has different id and transID////////////////
        try{
            const data = {
                stationName: name,
                position: Number(position), 
                lineNumber: Number(line), 
                isTransfer, 
                transferTo: isTransfer?
                    [{ position: Number(transferPosition), 
                        line: Number(transferLine) 
                    }]
                    : null
            };
            await createStation(data);

            if(isTransfer){
            const transData = {
                stationName: name,
                position: Number(transferPosition), 
                lineNumber: Number(transferLine), 
                isTransfer, 
                transferTo: isTransfer?
                    [{ position: Number(position), 
                        line: Number(line) 
                    }]
                    : null
                };
                await createStation(transData);
            }
            setName('');
            setLine('');
            setPosition('');
            setIsTransfer(false);
            setTransferPosition('');
            setTransferLine('');

            navigate('/station');
        }catch(err){
            setError(err.message || "Failed to create station");
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
        <div className='container w-100'>
            <h1 className='txtTitle my-4'>Create a new station</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            {/* <Link to='/station' className='btn btn-primary my-1'>
                <IoArrowBackCircle />
                back
            </Link> */}

            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Station Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Postion</Form.Label>
                    <Form.Control type="number" value={position} onChange={(e) => setPosition(e.target.value)} />
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Line Number</Form.Label>
                    <Form.Select value={line} onChange={(e) => setLine(e.target.value)}>
                        <option value="">Choose...</option>
                        <option value="1">line One</option>
                        <option value="2">line Two</option>
                        <option value="3">line Three</option>
                    </Form.Select>
                    </Form.Group>

                <Form.Group className="mb-3 txtLabel">
                    <Form.Check type="checkbox" label="Transfer Point" checked={isTransfer} 
                    onChange={(e) => {
                        setIsTransfer(e.target.checked);
                        if(!e.target.checked){
                            setIsTransfer(false);
                        }
                    }} />
                </Form.Group>

                {isTransfer && (
                <div>
                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Transfer Position</Form.Label>
                    <Form.Control type="number" value={transferPosition} onChange={(e) => setTransferPosition(e.target.value)} />
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Transfer Line</Form.Label>
                    <Form.Select value={transferLine} onChange={(e) => setTransferLine(e.target.value)}>
                        <option value="">Choose...</option>
                        <option value="1">line One</option>
                        <option value="2">line Two</option>
                        <option value="3">line Three</option>
                    </Form.Select>
                    </Form.Group>
                </div>
                )}
                
                <Button variant="primary" type="submit" className='mb-3'  disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : "Create"}
                </Button>
                </Form>
            </div>
        </div>
        </>
    )
}

export default CreateStation
