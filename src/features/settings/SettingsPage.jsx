import React, { useContext, useState } from 'react';
import '../../styles/StylePages.css';
import { Container, Form, Button, Badge } from 'react-bootstrap';
import { ThemeContext } from '../../services/ThemeContext';
import { FaMoon, FaSun, FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/AuthContext';

const SettingsPage = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const isSuperAdmin =user.role === 'superadmin';



    return (
        <Container className=" txtTitle my-3">
            <div className='d-flex justify-content-between'>
                <h2>Dashboard Settings</h2>
                <div className="d-flex gap-2 align-items-center">
                    {isSuperAdmin && (
                        <Button
                            variant="outline-danger"
                            size="sm"
                            title="Open Super Admin Panel"
                            onClick={() => navigate('/adminPanal')}
                        >
                            <FaUserShield className="me-1" />
                            Admin Panel
                            <Badge bg="danger" className="ms-2">Super</Badge>
                        </Button>
                    )}
                    <Button onClick={toggleTheme} className='btn'>
                        {theme === 'light'? <FaMoon />: <FaSun />}
                    </Button>
                </div>
            </div>

            {isSuperAdmin && (
                <div className="my-2">
                    <Badge bg="danger" className="px-3 py-2">
                        <FaUserShield className="me-1" /> Super Admin Account
                    </Badge>
                </div>
            )}

            <Form.Group className='my-3'>
                <Form.Label className='txtLabel'>Admin Name: </Form.Label>
                <Form.Control
                type="text"
                // placeholder={adminName}
                placeholder={user.name}
                aria-label="Disabled input example"
                disabled
                readOnly
            />
            </Form.Group>

            <Form.Group className='my-3'>
                <Form.Label className='txtLabel'>Admin Email: </Form.Label>
                <Form.Control
                type="text"
                // placeholder={adminEmail}
                placeholder={user.email}
                aria-label="Disabled input example"
                disabled
                readOnly
            />

            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Label className='txtLabel'>Admin SSN: </Form.Label>
                <Form.Control
                type="text"
                // placeholder={adminSSN}
                placeholder={user.ssn}
                aria-label="Disabled input example"
                disabled
                readOnly
            />
            </Form.Group>

        </Container>
    );
};

export default SettingsPage;