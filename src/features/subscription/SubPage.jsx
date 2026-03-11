import React, { useState } from 'react'
import '../../styles/StylePages.css'

import { Alert, Button, Card, CardGroup, Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SubPage() {
    const navigate = useNavigate();

    const [searchKey, setSearchKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);

    const handleSearch = async () => {
        setLoadingSearch(true);
        setError('');
        try{
            //search
        }catch(err){
            setError(err.message);
        }finally {
            setLoadingSearch(false);
        }
    };

    return (
        <div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Container className='headSection my-4 w-100'>
                <h2 className='txtTitle mb-3'>Subscription Management</h2>
                <CardGroup className='statCard'>
                    <Card className="stat-card me-2">
                    <Card.Body className="d-flex align-items-center gap-3 py-3">
                        <div>
                        <div>Total Members</div>
                        <div className='stat-value'>200</div>
                        </div>
                    </Card.Body>
                    </Card>
                    <Card className="stat-card me-2">
                    <Card.Body className="d-flex align-items-center gap-3 py-3">
                        <div>
                        <div>Expired</div>
                        <div className='stat-value'>5</div>
                        </div>
                    </Card.Body>
                    </Card>
                    <Card className="stat-card me-2">
                    <Card.Body className="d-flex align-items-center gap-3 py-3">
                        <div>
                        <div>Active</div>
                        <div className='stat-value'>15</div>
                        </div>
                    </Card.Body>
                    </Card>
                </CardGroup>
            </Container>
            <Container className='filterSection'>
                    <Row>
                    <Col className='align-middle'>
                        <input type='text' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder='Search by name or email…' className='rounded-3 p-2 mx-2 w-100' />
                    </Col>
                    <Col>
                        <Button className='btn' disabled={loadingSearch} onClick={handleSearch}>
                            {loadingSearch ? <Spinner size="sm" animation="border" /> : "Search"}
                        </Button>
                    </Col>
                    <Col>
                        <Form.Select>
                        <option key={"All"}>All Status</option>
                        <option value="Active" key={"Active"}>Active</option>
                        <option value="Expired" key={"Expired"}>Expired</option>
                        <option value="Card Issue" key={"Card Issue"}>Card Issue</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select>
                        <option key={"All"}>All Types</option>
                        <option value="Student" key={"Student"}>Student</option>
                        <option value="Individual" key={"Individual"}>Individual</option>
                        <option value="Corporate" key={"Corporate"}>Corporate</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Container>
            <Container className='TableSection mt-2'>
                <Table className="sub-table mb-0">
                <thead>
                    <tr>
                        <th>Member</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th className="hide-sm">Last Payment</th>
                        <th className="hide-sm">Next Renewal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        <div className="d-flex align-items-center gap-2">
                            <img src='../../assets/images/metroBg2.jpeg' alt='' className='w-20' />
                            <div>
                                <div>Rahma Nasser</div>
                                <div className="member-email">test@gmail.com</div>
                            </div>
                        </div>
                        </td>
                        <td>
                            Student
                        </td>
                        <td>Active</td>
                        <td className="hide-sm">10/2/2026</td>
                        <td className="hide-sm">10/5/2026</td>
                        <td>
                            <div className="d-flex flex-wrap gap-1">
                            <Button className='btn me-1' onClick={() => navigate(`/sub/details/213214`)}>
                                    Details
                                </Button>
                                <Button className='btn me-1'>
                                    Update
                                </Button>
                                <Button className='btn me-1'>
                                    Delete
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                </Table>
                <div className="d-flex justify-content-center mt-3">
                    <Button 
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="me-2"
                    >
                        Previous
                    </Button>

                    <span className="txtTitle align-self-center">Page {page}</span>

                    <Button 
                        disabled={page === 10}
                        onClick={() => setPage(page + 1)}
                        className="ms-2"
                    >
                        Next
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default SubPage
