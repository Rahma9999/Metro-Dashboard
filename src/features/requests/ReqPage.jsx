import React, { useEffect, useState } from 'react';
import '../../styles/StylePages.css';
import '../../styles/SubStyle.css';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { SubscriptionController } from '../../controllers/SubscriptionController';
import RequestCard from '../../component/RequestCard';
import { usePagination } from '../../services/usePagination';

const FILES = [
    { label: 'Photo', docType: 'photo', type: 'photo' },
    { label: 'National ID', docType: 'national_id', type: 'doc' },
    { label: 'Application Form', docType: 'form', type: 'form' }
];

function ReqPage() {
    const { getAllSubscriptions, changeStatus } = SubscriptionController();
    
    const [requests, setRequests]   = useState([]);
    const { state: { loading, error, result, noOfPages, page }, dispatch } = usePagination();
    const theme = localStorage.getItem('app-theme') || 'light';
    
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'loading' }); 
            try {
                const data = await getAllSubscriptions(page);
                dispatch({
                    type: 'setPagesData',
                    noOfPages: data.pages,
                    res: data.result 
                });
                setRequests(data.data);
            } catch (err) {
                dispatch({
                    type: 'setError',
                    payload: err.response?.data?.message || err.message
                });
            } finally {
                dispatch({ type: 'unloading' });
            }
        };
        fetchData();
    }, [page]);

    const handleStatusChange = async (id, status) => {
        try{
            changeStatus(id, status);
        }catch(err){
            dispatch({
                type: 'setError',
                payload: err.response?.data?.message || err.message
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
        <>
        <Container className="rounded-0">
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading &&
                requests.map((request) => (
                    <RequestCard
                        key={request.id}
                        request={request}
                        onStatusChange={handleStatusChange}
                    />
                ))}
        </Container>
        </>
    );
}

export default ReqPage;
