import React, { useEffect, useState } from 'react';
import '../../styles/StylePages.css';
import '../../styles/SubStyle.css';

import { Alert, Button, Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap';
import DBModal from '../../component/DBModal.js';
import { SubscriptionController } from '../../controllers/SubscriptionController.js';
import { formatDate } from '../../services/FormatData.js'
import { TypeBadge, StatusBadge } from '../../services/Badge.js';
import { usePagination } from '../../services/usePagination.js';
import { FaSync } from 'react-icons/fa';


function SubPage() {
    const { getAllSubscriptions, searchSubName, searchSubStatus } = SubscriptionController();

    const [subscriptions, setSubscriptions] = useState([]);
    const [name, setName] = useState('');
    const [selectedSubId, setSelectedSubId] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [mode, setMode] = useState('');

    const {state: { loading, error, loadingSearch, status, noOfPages, page }, dispatch} = usePagination();
    const theme = localStorage.getItem('app-theme') || 'light';

    const getSubs = async () => {
        dispatch({ type: 'loading' }); 
        setName('');
        try {
            const data = await getAllSubscriptions(page);

            dispatch({
                type: 'setPagesData',
                noOfPages: data.pages,
                res: data.result 
            });

            setSubscriptions(data.data);

            if (!data || data.result === 0) {
                dispatch({
                    type: 'setError',
                    payload: 'No subscriptions to display!'
                });
            }

        } catch (err) {
            dispatch({
                type: 'setError',
                payload: err.response?.data?.message || err.message
            });
        } finally {
            dispatch({ type: 'unloading' });
        }
    };

    useEffect(() => {
        getSubs();
    }, []);

    const handleSearch = async () => {
        dispatch({ type: 'setLoadingSearch' });
        try {
            const res = await searchSubName(name);
            setSubscriptions(res || []);
        } catch (err) {
            dispatch({
                type: 'setError',
                payload: err.message 
            });
        } finally {
            setName('');
            dispatch({ type: 'setUnloadingSearch' });
        }
    };

    const statusSearch = async (stat) => {
        try {
            if(stat === '')
                getSubs();
            else{
                const res = await searchSubStatus(stat);
                setSubscriptions(res || []);
            }
        } catch (err) {
            dispatch({
                type: 'setError',
                payload: err.message 
            });
        }
    };

    if (loading) {
        return (
            <div className="position-absolute top-50 start-50 translate-middle">
                <Spinner animation="border" variant={theme === 'dark' ? 'light' : 'dark'} />
            </div>
        );
    }

    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}

            <DBModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                mode={mode}
                id={selectedSubId}
            />

            <h2 className='txtTitle m-3'>Subscription Management</h2>

            <Container className='filterSection'>
                <Row>
                    <Col>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Search by name…'
                            className='rounded-3 p-2 mx-2 w-50'
                        />

                        <Button className='btn' disabled={loadingSearch} onClick={handleSearch}>
                            {loadingSearch ? <Spinner size="sm" animation="border" /> : "Search"}
                        </Button>

                        <Button className='btn mx-2' variant="outline-secondary" onClick={getSubs} disabled={loading}>
                            <FaSync className={loading ? 'spin' : ''} />
                        </Button>

                    </Col>
                    <Col>
                        <Form.Select
                        className='rounded-3 p-2 mx-2 w-50'
                        value={status}
                        onChange={(e) => {
                            const newStatus = e.target.value;
                            dispatch({ type: 'setStatus', status: e.target.value }); 
                            statusSearch(newStatus);
                            }}>
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </Form.Select>
            
                    </Col>

                </Row>
            </Container>

            {/* 🔹 Table */}
            <Container className='TableSection mt-2'>
                <Table bordered className="sub-table mb-0" variant={theme}>
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th className="hide-sm">Created At</th>
                            <th className="hide-sm">Renewal At</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {subscriptions.map((sub) => (
                            <tr key={sub._id}>
                                <td>
                                    <div>
                                        <div>{sub.user?.name}</div>
                                        <div className="member-email">{sub.user?.email}</div>
                                    </div>
                                </td>

                                <td>
                                    <TypeBadge type={
                                        (sub.type?.category?.en === "special needs")?"special-needs":
                                        (sub.type?.category?.en || 'N/A')
                                        } />
                                </td>

                                <td>
                                    <StatusBadge status={sub.status} />
                                </td>

                                <td className="hide-sm">{formatDate(sub.createdAt)}</td>
                                <td className="hide-sm">{(sub.renewalInitiatedAt)? formatDate(sub.renewalInitiatedAt): 'null'}</td>

                                {/* <td>
                                    <Button
                                        className='btn'
                                        onClick={() => {
                                            setSelectedSubId(sub._id);
                                            setMode('viewSub');
                                            setModalShow(true);
                                        }}
                                    >
                                        Details
                                    </Button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* 🔹 Pagination */}
                <div className="d-flex justify-content-center mt-3">
                    <Button
                        disabled={page === 1}
                        onClick={() => dispatch({ type: 'decPage' })}
                        className="me-2"
                    >
                        Previous
                    </Button>

                    <span className="txtTitle align-self-center">Page {page}</span>

                    <Button
                        disabled={page >= noOfPages}
                        onClick={() => dispatch({ type: 'incPage' })}
                        className="ms-2"
                    >
                        Next
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default SubPage;