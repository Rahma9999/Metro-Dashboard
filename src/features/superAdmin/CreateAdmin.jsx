import React, { useReducer, useState } from 'react';
import { Button, Alert, Spinner, Form } from 'react-bootstrap';
import '../../styles/StylePages.css';
import { SuperAdminController } from '../../controllers/SuperAdminController';

const adminForm = {
    name: '', 
    email: '',
    ssn: '',
    password: '', 
    role: '',
};
const reducer = (state, action) => {
    switch(action.type){
        case 'setadminForm':
            return {...state, [action.field]: action.value};
        case 'resetadminForm':
            return adminForm;
        default:
            throw new Error('create admins: reducer error!!');
    }
}

function CreateAdmin({ onHide }) {
    const { addAdmin } = SuperAdminController();

    const [{name, email, ssn, password, role}, dispatch] = useReducer(reducer, adminForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreate = async (event) => {
        event.preventDefault();
        dispatch({type: 'resetadminForm'})
        setError('');

        if (!name.trim())    
            setError('Name is required.');

        if (!email.trim())   
            setError('Email is required.');
        else if (!/\S+@\S+\.\S+/.test(email)) 
            setError('Enter a valid email.');

        if (!password)       
            setError('Password is required.');
        else if (password.length < 6) 
            setError('Minimum 6 characters.');
        
        if (!ssn.trim())     
            setError('SSN is required.');

        setLoading(true);
        try{
            await addAdmin({
                name,
                email,
                password,
                ssn,
                role: 'admin'
            });
            
            dispatch({type: 'resetadminForm'})
            onHide();
        }catch(err){
            setError(err.massage || "Failed to create admin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className='container w-100'>
            <h2 className='txtTitle my-4'>Create New Admin</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            
            <div>
                <Form onSubmit={handleCreate}>
                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Admin Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => dispatch({type: 'setadminForm', field: 'name', value: e.target.value})} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => dispatch({type: 'setadminForm', field: 'email', value: e.target.value})} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => dispatch({type: 'setadminForm', field: 'password', value: e.target.value})} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label className='label txtLabel'>SSN</Form.Label>
                    <Form.Control type="text" value={ssn} onChange={(e) => dispatch({type: 'setadminForm', field: 'ssn', value: e.target.value})} />
                    </Form.Group>

                
                <Button variant="primary" type="submit" className='mb-3'  disabled={loading}>
                    {loading ? <Spinner size="sm" animation="border" /> : "Create"}
                </Button>
                </Form>
            </div>
        </div>
        </>
    )
}

export default CreateAdmin
