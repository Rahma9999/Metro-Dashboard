import React from 'react'
import '../../styles/StylePages.css'
import '../../styles/SubStyle.css'
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap'

function ReqPage() {
    const theme = localStorage.getItem('app-theme') || 'light';
    // const isPending = request.status === "pending";

function TypeBadge({ type }) {
    return (
        <span className={`metro-badge metro-badge--${type}`}>
            {type}
        </span>
    );
}

function StatusBadge({ status }) {
    return (
        <span className={`metro-badge metro-badge--${status}`}>
        {status}
        </span>
    );
}

function fileIcon(type) {
    const icons = { photo: "🖼️", form: "📄", doc: "📎" };
    return icons[type] ?? "📎";
}

function FileChip({ file }) {
    return (
        <span className="metro-file-chip">
        <span className="metro-file-chip__icon">{fileIcon(file.type)}</span>
        {file.name}
        <span className="metro-file-chip__size">{file.size}</span>
        </span>
    );
}

    return (
        <>
        <Container className='my-4 w-100'>
            <h2 className='txtTitle mb-3'>Subscription Requests</h2>
            <Row xs={1} sm={2} lg={4} className='statCard g-3'>
                <Col>
                <Card className="stat-card">
                    <Card.Body className="card-content">
                        <span className='card-txt'>3</span>
                        <span className='card-txt'>Total</span>
                    </Card.Body >
                </Card>
                </Col>
                <Col>
                <Card className="stat-card">
                    <Card.Body className="card-content">
                        <span className='card-txt'>1</span>
                        <span className='card-txt'>Pending</span>
                    </Card.Body >
                </Card>
                </Col>
                <Col>
                <Card className="stat-card">
                    <Card.Body className="card-content">
                        <span className='card-txt'>1</span>
                        <span className='card-txt'>Rejected</span>
                    </Card.Body >
                </Card>
                </Col>
                <Col>
                <Card className="stat-card">
                    <Card.Body className="card-content">
                        <span className='card-txt'>1</span>
                        <span className='card-txt'>Accepted</span>
                    </Card.Body >
                </Card>
                </Col>
            </Row>
        </Container>

        <Container className='rounded-0'>
            <Card bg={theme} className="metro-card mb-3">
                <Card.Body className='p-3'>
                    <div className="d-flex align-items-start g-2 mb-2">
                        <div className="request-card__info">
                            <div className="request-card__name">Ahmed</div>
                            <div className="request-card__email">ahmed@gmail.com</div>

                            <div className="request-card__meta">
                            <TypeBadge type="student" />
                            
                            <span className="request-card__date">
                                12-5-2026 . Ain Sham university
                                {/* {request.university && ` · ${request.university}`} */}
                            </span>
                            </div>
                        </div>
                        <StatusBadge status='pending' />
                    </div>
                    {/* ── File chips ───────────────────────────── */}
                    <div className="request-card__files">
                    {/* {request.files.map((f) => (
                        <FileChip key={f.name} file={f} />
                    ))} */}
                    </div>
                    {/* ── Action buttons ───────────────────────── */}
                    
                    <div className="request-card__actions">
                        {/* {isPending && ( 
                            <>*/}
                                <button
                                className="metro-btn metro-btn--accept"
                                // onClick={() => onAccept(request)}
                            >
                                Accept
                            </button>

                            <button
                                className="metro-btn metro-btn--reject"
                                // onClick={() => onReject(request)}
                            >
                                Reject
                            </button>
                        {/* </>
                        )} */}
                    </div> 
                </Card.Body>
            </Card>

            <Card bg={theme} className="metro-card mb-3">
                <Card.Body className='p-3'>
                    <div className="d-flex align-items-start g-2 mb-2">
                        <div className="request-card__info">
                            <div className="request-card__name">Rahma</div>
                            <div className="request-card__email">Rahma@gmail.com</div>

                            <div className="request-card__meta">
                            <TypeBadge type="individual" />
                            
                            <span className="request-card__date">
                                12-5-2026 . Ain Sham university
                                {/* {request.university && ` · ${request.university}`} */}
                            </span>
                            </div>
                        </div>
                        <StatusBadge status='rejected' />
                    </div>
                    {/* ── File chips ───────────────────────────── */}
                    <div className="request-card__files">
                    {/* {request.files.map((f) => (
                        <FileChip key={f.name} file={f} />
                    ))} */}
                    </div>
                    {/* ── Action buttons ───────────────────────── */}
                    
                    <div className="request-card__actions">
                        {/* {isPending && ( 
                            <>*/}
                                <button
                                className="metro-btn metro-btn--accept"
                                // onClick={() => onAccept(request)}
                            >
                                Accept
                            </button>

                            <button
                                className="metro-btn metro-btn--reject"
                                // onClick={() => onReject(request)}
                            >
                                Reject
                            </button>
                        {/* </>
                        )} */}
                    </div> 
                </Card.Body>
            </Card>

            <Card bg={theme} className="metro-card mb-3">
                <Card.Body className='p-3'>
                    <div className="d-flex align-items-start g-2 mb-2">
                        <div className="request-card__info">
                            <div className="request-card__name">Samera</div>
                            <div className="request-card__email">samera@gmail.com</div>

                            <div className="request-card__meta">
                            <TypeBadge type="individual" />
                            
                            <span className="request-card__date">
                                12-5-2026 . Ain Sham university
                                {/* {request.university && ` · ${request.university}`} */}
                            </span>
                            </div>
                        </div>
                        <StatusBadge status='accepted' />
                    </div>
                    {/* ── File chips ───────────────────────────── */}
                    <div className="request-card__files">
                    {/* {request.files.map((f) => (
                        <FileChip key={f.name} file={f} />
                    ))} */}
                    </div>
                    {/* ── Action buttons ───────────────────────── */}
                    
                    <div className="request-card__actions">
                        {/* {isPending && ( 
                            <>*/}
                                <button
                                className="metro-btn metro-btn--accept"
                                // onClick={() => onAccept(request)}
                            >
                                Accept
                            </button>

                            <button
                                className="metro-btn metro-btn--reject"
                                // onClick={() => onReject(request)}
                            >
                                Reject
                            </button>
                        {/* </>
                        )} */}
                    </div> 
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}

export default ReqPage
