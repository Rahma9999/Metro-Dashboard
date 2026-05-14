import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import '../../styles/StylePages.css';
import { Spinner, Button, Alert } from 'react-bootstrap';
import DBModal from '../../component/DBModal.js';
import { TypeController } from '../../controllers/TypeController.js';
import { usePagination } from '../../services/usePagination.js';
import { FaSync } from 'react-icons/fa';
import { AppLoader } from '../../component/AppLoader.js';

function TypePage() {
    const { getAllSubTypes, deleteSubType } = TypeController();
    const theme = localStorage.getItem('app-theme') || 'light';
const { state: { loading, error, result, page }, dispatch } = usePagination();

    const [types, setTypes] = useState([]);
    const [selectedTypeId, setSelectedTypeId] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [mode, setMode] = useState('');

    const fetchTypes = async () => {
        dispatch({type: 'loading'});
        try{
            const res = await getAllSubTypes(page);
            // console.log('sub Types: ', res);
            setTypes(res);
        }catch(err){
            dispatch({type: 'setError', payload: ( err.message || 'Failed to load subscription types')});
        }finally{
            dispatch({type: 'unloading'});        
        }
    }

    useEffect(() => {
        fetchTypes();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this subscription type?")) return;
        dispatch({type: 'loading'});
        try {
            await deleteSubType(id);
            fetchTypes(); 
        } catch (err) {
        dispatch({type: 'setError', payload: (err.message || "Failed to delete this subscription type")});
        } finally {
        dispatch({type: 'unloading'});
        }
    };

    if(loading) return (
        <AppLoader />
        );

    return (
        <div className='container my-4 w-100'>
            <h2 className='txtTitle'>Subscription Types Management</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <DBModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                mode={mode}
                id={selectedTypeId}
            />
            
            <Button className='btn mx-2' variant="outline-secondary" onClick={fetchTypes} disabled={loading}>
                <FaSync className={loading ? 'spin' : ''} />
            </Button>

            <Button className='btn me-1' onClick={() => {
                    setMode('createType');
                    setModalShow(true);}
                    }>
                Add new type
            </Button>   

            <div className="container-fluid my-4">
                <Table bordered className='typeTable mw-100' variant={theme}>
                <thead>
                    <tr>
                    <th>category</th>
                    <th>duration</th>
                    <th>zones</th>
                    <th>prices</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map((type) => (
                        <tr key={type._id}>
                            <td>{type.category.en}</td>
                            <td>{type.duration.en}</td>
                            <td>{type.zones}</td>
                            <td>{type.prices}</td>
                            <td>
                                <Button className='btn me-1' onClick={() => {
                                        setSelectedTypeId(type._id);
                                        setMode('editType');
                                        setModalShow(true);}
                                        }>
                                    Edit
                                </Button>
                                <Button className='btn me-1' onClick={() => handleDelete(type._id)}>
                                    Delete
                                </Button>                            
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>
                <div className="d-flex justify-content-center mt-2">
                                <Button 
                                    disabled={page === 1}
                                    onClick={() => dispatch({type: 'decPage'})}
                                    className="me-2"
                                >
                                    Previous
                                </Button>
                
                                <span className="txtTitle align-self-center">Page {page}</span>
                                
                                <Button 
                                    disabled={page >= result}
                                    onClick={() => {
                                        dispatch({type: 'incPage'})
                                    }}
                                    className="ms-2"
                                >
                                    Next
                                </Button>
                            </div>
            </div>
        </div>
    )
}

export default TypePage
