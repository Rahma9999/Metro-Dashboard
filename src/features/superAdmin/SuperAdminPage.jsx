import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import '../../styles/StylePages.css';
import { Alert, Badge, Container, Spinner } from 'react-bootstrap';
import DBModal from '../../component/DBModal.js';
import { usePagination } from '../../services/usePagination.js';
import {SuperAdminController} from '../../controllers/SuperAdminController.js';
import { FaLock, FaPlus, FaSync, FaTrash, FaUserShield } from 'react-icons/fa';

const AccessDenied = () => (
    <Container className="d-flex flex-column align-items-center justify-content-center position-absolute top-50 start-50 translate-middle" style={{ minHeight: '60vh' }}>
        <FaLock size={64} className="text-danger mb-4" />
        <h3 className="fw-bold mb-2 txtTitle">Access Restricted</h3>
        <p className="text-center txtLabel" style={{ maxWidth: 380 }}>
        This page is only available to <strong>Super Admins</strong>. 
        Contact your system administrator if you believe this is a mistake.
        </p>
    </Container>
);

// ─── Role Guard Hook ────────────────────────────────────────────────────────
const useSuperAdminGuard = () => {
  // Adjust the key/value to match whatever your auth stores in localStorage
  // e.g. 'role' → 'superadmin'  |  or 'userType' → 'super_admin'  etc.
    const role = localStorage.getItem('role');
    return role === 'superadmin';
};

function SuperAdminPage() {
    const isSuperAdmin = useSuperAdminGuard();
    const { getAdmins, deleteAdmin } = SuperAdminController();
    const [admins, setAdmins] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [mode, setMode] = useState('');
    
const { state: { loading, error }, dispatch } = usePagination();
    const theme = localStorage.getItem('app-theme') || 'light';

    const fetchAdmins = async () => {
        dispatch({type:'loading'});
        try{
            const data = await getAdmins();
            console.log(data);
            if(!data)
                dispatch({type: 'setError', payload: ( "There are no admins to display.")});
            else
                setAdmins(data);
        }catch(err){
            dispatch({type: 'setError', payload: ( err.massage )});
        }finally {
            dispatch({type:'unloading'});
        }
    } 

    useEffect(() => {
        if (isSuperAdmin) fetchAdmins();
    }, [isSuperAdmin]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this admin?")) return;
        dispatch({type:'loading'});
        try {
            await deleteAdmin(id);
            fetchAdmins(); 
        } catch (err) {
            dispatch({type: 'setError', payload: ( "Failed to delete admin")});
        } finally {
        dispatch({type:'unloading'});
        }
    };


    if(loading) return (
    <div className="position-absolute top-50 start-50 translate-middle">
        <Spinner animation="border" variant={(theme === 'dark')? 'light' : 'dark'} />
    </div>
    );

    if (!isSuperAdmin) return <AccessDenied />;
    
    return (
        <div className='adminMain container my-4 w-100'>
            {error && <Alert variant="danger">{error}</Alert>}

            <DBModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                mode={mode}
            />

            <Container className='my-4 w-100'>
                
            </Container>
            
            <Container className=''>
                {/* <h2 className='txtTitle mb-3'>Admin Management</h2>
                <Row>
                    <Col>
                        <Button className='btn  me-1' onClick={() => {
                                setMode('createadmin');
                                setModalShow(true);}
                                }>
                            Add new admin
                        </Button>
                        <Button className='btn' onClick={fetchAdmins}>Refresh</Button>
                    </Col>
                </Row> */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-2">
                        <FaUserShield size={28} className="text-primary" />
                        <div>
                        <h2 className="mb-0 fw-bold txtTitle">Admin Management</h2>
                        <small className=" txtLabel">Super Admin Panel · Manage system admins</small>
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <Button variant="outline-secondary" size="sm" onClick={fetchAdmins} disabled={loading}>
                        <FaSync className={loading ? 'spin' : ''} />
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => {
                                setMode('createAdmin');
                                setModalShow(true);}
                                }>
                        <FaPlus className="me-1" /> Add Admin
                        </Button>
                    </div>
                    </div>
            </Container>
            <Container className='mt-3'>
                <Table bordered variant={theme}>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>SSN</th>
                    <th>Role</th>
                    <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin._id}>
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            <td>
                                <span className="txtLabel">
                                    {'•'.repeat((admin.ssn?.toString().length ?? 3) - 4)}
                                    {admin.ssn?.toString().slice(-4) ?? '••••'}
                                </span>
                            </td>
                            <td>
                                <Badge bg={admin.role === 'superadmin' ? 'danger' : 'primary'}>
                                    {admin.role ?? 'admin'}
                                </Badge>
                            </td>
                            <td>
                                {/* Prevent super admin from deleting themselves or other super admins */}
                                {admin.role === 'superadmin' ? (
                                    <span className="txtLabel">Protected</span>
                                ) : (
                                    <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(admin._id)}
                                    >
                                    <FaTrash />
                                    </Button>
                                )}       
                            </td>
                        </tr>
                    ))}
                </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default SuperAdminPage
