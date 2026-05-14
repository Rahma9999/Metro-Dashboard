import React, { useState } from 'react';
import { Button, Card, Collapse } from 'react-bootstrap';
import { formatDate } from '../services/FormatData';
import '../styles/SubStyle.css';
import { MailTypeBadge } from '../services/Badge';

function MailCard({ mail }) {
    const theme = localStorage.getItem('app-theme') || 'light';
    const [open, setOpen] = useState(false);
    const statusClass = mail.type;

    return (
        <Card bg={theme} className="metro-card mb-3 shadow-sm">
            <Card.Body className="p-3">
                <div>
                <div className="flex-grow-1 min-w-0">
                    <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-1">
                        <strong className="txtTitle mail-title">
                            {mail.user?.name}
                        </strong>

                        <MailTypeBadge status={statusClass} />
                    </div>

                <div className="d-flex d-flex justify-content-between align-items-center gap-2 mb-2">

                    <div className="mail-text">
                        To: <span style={{ fontWeight: 500 }}>
                            {mail.to}
                        </span>
                    </div>

                    <div>
                        <small className="mail-date">
                            Created At: {formatDate(mail.createdAt)}
                        </small>
                    </div>
                    <div>
                        <small className="mail-date">
                            Updated At: {formatDate(mail.updatedAt)}
                        </small>
                    </div>
                </div>
                </div>
            </div>


            {mail.metadata?.rejectionReason && (
                <div>
                    <Button
                        size="sm"
                        variant="light"
                        className="mail-button"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? "Hide" : "Read"}
                    </Button>

                    <Collapse in={open}>
                    <div className='mt-3 p-3 rounded mail-body'>
                            <strong className="mail-text">Rejection Reason: </strong>
                            {mail.metadata.rejectionReason}
                    </div>
                    </Collapse>
                </div>
            )}
                {/* <div className="mb-2">
                    <strong>Type:</strong> {mail.type}
                </div> */}


            </Card.Body>
        </Card>
    );
}

export default MailCard;