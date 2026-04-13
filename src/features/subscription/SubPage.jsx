import React, { useState } from 'react'
import '../../styles/StylePages.css'
import '../../styles/SubStyle.css'

import { Alert, Button, Card, CardGroup, Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap'
import StationModal from '../../component/DBModal.js';

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

function SubPage() {
    const [searchKey, setSearchKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [selectedSubId, setSelectedSubId] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [mode, setMode] = useState('');

    const theme = localStorage.getItem('app-theme') || 'light';

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

            <StationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                mode={mode}
                id={selectedSubId}
            />
            <h2 className='txtTitle m-3'>Subscription Management</h2>
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
                <Table bordered className="sub-table mb-0" variant={theme}>
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
                            <TypeBadge type="student" />
                        </td>
                        <td>
                            <StatusBadge status='accepted' />
                        </td>
                        <td className="hide-sm">10/2/2026</td>
                        <td className="hide-sm">10/5/2026</td>
                        <td>
                            <div className="d-flex flex-wrap gap-1">
                            <Button className='btn me-1' onClick={() => {
                                        setSelectedSubId('1212123');
                                        setMode('viewSub');
                                        setModalShow(true);}
                                        }>
                                    Details
                                </Button>
                                {/* <Button className='btn me-1'>
                                    Update
                                </Button>
                                <Button className='btn me-1'>
                                    Renew
                                </Button> */}
                            </div>
                        </td>
                    </tr>

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
                            <TypeBadge type="individual" />
                        </td>
                        <td>
                            <StatusBadge status='rejected' />
                        </td>
                        <td className="hide-sm">10/2/2026</td>
                        <td className="hide-sm">10/5/2026</td>
                        <td>
                            <div className="d-flex flex-wrap gap-1">
                            <Button className='btn me-1' onClick={() => {
                                        setSelectedSubId('1212123');
                                        setMode('viewSub');
                                        setModalShow(true);}
                                        }>
                                    Details
                                </Button>
                                {/* <Button className='btn me-1'>
                                    Update
                                </Button>
                                <Button className='btn me-1'>
                                    Renew
                                </Button> */}
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
