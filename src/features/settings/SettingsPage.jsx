import React, { useContext, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { ThemeContext } from '../../services/ThemeContext';

const SettingsPage = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const [language, setLanguage] = useState('English');

    const adminName = localStorage.getItem('name') || 'undefined';
    const adminEmail = localStorage.getItem('email') || 'undefined';
    const adminSSN = localStorage.getItem('ssn') || 0;

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };


    return (
        <Container className=" txtTitle my-3">
            <h2>Dashboard Settings</h2>

            <Form.Group className='my-3'>
                <Form.Label className='txtLabel'>Admin Name: </Form.Label>
                <Form.Control
                type="text"
                placeholder={adminName}
                aria-label="Disabled input example"
                disabled
                readOnly
            />
            </Form.Group>

            <Form.Group className='my-3'>
                <Form.Label className='txtLabel'>Admin Email: </Form.Label>
                <Form.Control
                type="text"
                placeholder={adminEmail}
                aria-label="Disabled input example"
                disabled
                readOnly
            />

            </Form.Group>
            <Form.Group className='my-3'>
                <Form.Label className='txtLabel'>Admin SSN: </Form.Label>
                <Form.Control
                type="text"
                placeholder={adminSSN}
                aria-label="Disabled input example"
                disabled
                readOnly
            />
            </Form.Group>

            <Form.Group className="my-3">
                <Form.Label className='txtLabel'>Language</Form.Label>
                <Form.Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled
                >
                <option value="English" onSelect={() => handleLanguageChange('English')}>English</option>
                <option value="Arabic" onSelect={() => handleLanguageChange('Arabic')}>Arabic</option>
                </Form.Select>
            </Form.Group>

            <Button onClick={toggleTheme}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </Button>
        </Container>
    );
};

export default SettingsPage;