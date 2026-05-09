import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { StationController } from '../../controllers/StationController';

// const userForm = {
//     name: '', 
//     position: -1, 
//     line: '', 
//     isTransfer: false, 
//     transferLine: '', 
//     transferPosition: -1
// };
// const reducer = (state, action) => {
//     switch(action.type){
//         case 'setForm':
//             return {...state, [action.field]: action.value};
//         case 'resetForm':
//             return userForm;
//         default:
//             throw new Error('create station: reducer error!!');
//     }
// }

function EditStation({id, onHide}) {
    const { editStation, getOneStation } = StationController();

    const [name, setName] = useState('');
    const [position, setPosition] = useState(-1);
    const [line, setLine] = useState('');
    const [isTransfer, setIsTransfer] = useState(false);
    const [transferPosition, setTransferPosition] = useState(-1);
    const [transferLine, setTransferLine] = useState('');
    
    const [transferId, setTransferId] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadStation = async () => {
            setLoading(true);
            try {
                const data = await getOneStation(id);
    
                setName(data.name);
                setLine(data.line_number);
                setPosition(data.position);
                setIsTransfer(data.is_transfer);

                if (data.is_transfer && data.transfer_to) {
                    setTransferLine(data.transfer_to[0].line);
                    setTransferPosition( data.transfer_to[0].position);
                    setTransferId( data.transfer_to[0]._id);
                }
    
            } catch (err) {
                setError(err.message || "Failed to load station");
            }finally {
                setLoading(false);
            }
        };

        loadStation();
    }, [id, getOneStation]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if(!name.trim()) return setError("Enter station name.");
        if(!position || position <= 0) return setError("Invalid position.");
        if(!line) return setError("Select line")
        if (isTransfer) {
            if (!transferPosition)
                return setError("Enter transfer position.");
            if (!transferLine)
                return setError("Select transfer line.");
            }
            
        setLoading(true);
        const updatedStation = {
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

        try { 
            await editStation(id, updatedStation);
            if(isTransfer && transferId){
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
                await editStation(transferId, transData);
            }
            onHide();
        }catch(err){
            setError(err.message || "Failed to update station");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container w-100 mt-4'>
            <h2 className='txtTitle my-4'>Edit the {name} Station</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}

            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Postion</Form.Label>
                    <Form.Control type="number" value={position} onChange={(e) => setPosition(e.target.value)} />
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Line</Form.Label>
                    <Form.Select value={line} onChange={(e) => setLine(e.target.value)}>
                        <option value="">Choose...</option>
                        <option value="1">line One</option>
                        <option value="2">line Two</option>
                        <option value="3">line Three</option>
                    </Form.Select>
                    </Form.Group>

                    <Form.Check type="checkbox" className="mb-3 txtLabel" label="Transfer Station" checked={isTransfer} 
                    onChange={(e) => {
                        setIsTransfer(e.target.checked);
                        if(!e.target.checked){
                            setIsTransfer(false);
                        }
                    }} />

                {isTransfer && (
                <div>
                    <Form.Group className="my-3">
                    <Form.Label className='label txtLabel'>Transfer Position</Form.Label>
                    <Form.Control type="number" value={transferPosition} onChange={(e) => setTransferPosition(e.target.value)} />
                    </Form.Group>
                
                    <Form.Group className="my-3">
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
                
                    <Button type="submit" disabled={loading}>
                        {loading ? <Spinner size="sm" animation="border" /> : "Update"}
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default EditStation
