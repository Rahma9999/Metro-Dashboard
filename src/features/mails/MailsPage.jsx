import React, { useState } from 'react'
import { Badge, Button, Card, Collapse, Container } from 'react-bootstrap';
import '../../styles/SubStyle.css'

// Remember put all of here in component and callback with props!!!!!

function MailsPage() {
    const [open, setOpen] = useState(false);
    const isAcceptance = true;
    const statusClass = isAcceptance ? "accept" : "reject";
    const theme = localStorage.getItem('app-theme') || 'light';

    return (
        <div>
            <Container className='my-4 w-100'>
            <h2 className='txtTitle mb-3'>Subscription Requests</h2>
            <Card bg={theme} className={`mb-3 mail-card ${statusClass}`}>
                <Card.Body className="p-3">
                    
                    <div className="d-flex align-items-start gap-3">

                        {/* Icon */}
                        <div className={`mail-icon ${statusClass}`}>
                            {isAcceptance ? "✓" : "✕"}
                        </div>

                        <div className="flex-grow-1 min-w-0">
                            <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                                <strong className="txtTitle mail-title">
                                    Metro Subscription — Application Rejected
                                </strong>

                                <Badge className={`mail-badge ${statusClass}`}>
                                    Acception
                                </Badge>
                            </div>

                            <div className="mail-text">
                                To: <span style={{ fontWeight: 500 }}>
                                    layla.ibrahim@nile-uni.edu.eg
                                </span>
                            </div>

                            <div className="mail-date">
                                Sent: 2025-04-04
                            </div>
                        </div>

                        <Button
                            size="sm"
                            variant="light"
                            className="mail-button"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? "Hide" : "Read"}
                        </Button>
                    </div>

                    <Collapse in={open}>
                        <div>
                            <div className="mt-3 p-3 rounded mail-body">
                                <p className='txtTitle'>
                                    Dear Omar Youssef,

                                    Congratulations! Your subscription application has been approved.

                                    Your account is now active. Visit any Metro station to collect your card.

                                    — Metro Administration
                                </p>
                            </div>
                        </div>
                    </Collapse>

                </Card.Body>
            </Card>
            </Container>
        </div>
    )
}

export default MailsPage