import React, { useReducer, useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import '../../styles/StylePages.css';
import { StationController } from './StationController';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';

const userForm = {
    name: '', 
    position: -1, 
    line: '', 
    isTransfer: false, 
    transferLine: '', 
    transferPosition: -1
};
const reducer = (state, action) => {
    switch(action.type){
        case 'setForm':
            return {...state, [action.field]: action.value};
        case 'resetForm':
            return userForm;
        default:
            throw new Error('create station: reducer error!!');
    }
}

function CreateStation() {
    const navigate = useNavigate();
    const { createStation } = StationController();
    
    // const [name, setName] = useState('');
    // const [position, setPosition] = useState(-1);
    // const [line, setLine] = useState('');
    // const [isTransfer, setIsTransfer] = useState(false);
    // const [transferPosition, setTransferPosition] = useState(-1);
    // const [transferLine, setTransferLine] = useState('');

    const [{name, position, line, isTransfer, transferLine, transferPosition}, dispatch] = useReducer(reducer, userForm);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({type: 'resetForm'})
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

        try{
            const data = {
                stationName: name,
                lineNumber: Number(line), 
                position: Number(position), 
                isTransfer, 
                transferTo: isTransfer?
                    [{ position: Number(transferPosition), 
                        line: Number(transferLine) 
                    }]
                    : null
            };
            await createStation(data);
            dispatch({type: 'resetForm'})
            navigate('/station');
        }catch(err){
            console.log(err)
            setError("Failed to create station: There is a station already exists at this position on this line");
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
                    <Form.Control type="text" value={name} onChange={(e) => dispatch({type: 'setForm', field: 'name', value: e.target.value})} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Postion</Form.Label>
                    <Form.Control type="number" value={position} onChange={(e) => dispatch({type: 'setForm', field: 'position', value: Number(e.target.value)})} />
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Line Number</Form.Label>
                    <Form.Select value={line} onChange={(e) => dispatch({type: 'setForm', field: 'line', value: e.target.value})}>
                        <option value="">Choose...</option>
                        <option value="1">line One</option>
                        <option value="2">line Two</option>
                        <option value="3">line Three</option>
                    </Form.Select>
                    </Form.Group>

                <Form.Group className="mb-3 txtLabel">
                    <Form.Check type="checkbox" label="Transfer Point" checked={isTransfer} 
                    onChange={(e) => {
                        dispatch({type: 'setForm', field: 'isTransfer', value: e.target.value});
                        if(!e.target.checked){
                            dispatch({type: 'setForm', field: 'isTransfer', value: false})
                        }
                    }} />
                </Form.Group>

                {isTransfer && (
                <div>
                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Transfer Position</Form.Label>
                    <Form.Control type="number" value={transferPosition} onChange={(e) => dispatch({type: 'setForm', field: 'transferPosition', value: Number(e.target.value)})} />
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Transfer Line</Form.Label>
                    <Form.Select value={transferLine} onChange={(e) => dispatch({type: 'setForm', field: 'transferLine', value: e.target.value})}>
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
