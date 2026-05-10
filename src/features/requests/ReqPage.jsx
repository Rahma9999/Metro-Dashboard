import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/StylePages.css';
import '../../styles/SubStyle.css';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { SubscriptionController } from '../../controllers/SubscriptionController';
import RequestCard from '../../component/RequestCard';
import { usePagination } from '../../services/usePagination';


function ReqPage() {
    const { getAllSubscriptions, changeStatus } = SubscriptionController();
    
    const [requests, setRequests]   = useState([]);
    const { state: { loading, error, page }, dispatch } = usePagination();
    const theme = localStorage.getItem('app-theme') || 'light';
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         dispatch({ type: 'loading' }); 
    //         try {
    //             const data = await getAllSubscriptions(page);
    //             dispatch({
    //                 type: 'setPagesData',
    //                 noOfPages: data.pages,
    //                 res: data.result 
    //             });
    //             setRequests(data.data);
    //         } catch (err) {
    //             dispatch({
    //                 type: 'setError',
    //                 payload: err.response?.data?.message || err.message
    //             });
    //         } finally {
    //             dispatch({ type: 'unloading' });
    //         }
    //     };
    //     fetchData();
    // }, [page]);

    const fetchData = useCallback(async (currentPage) => {
        dispatch({ type: 'loading' });
        try {
            const data = await getAllSubscriptions(currentPage);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]); // only re-create when page changes

    useEffect(() => {
        fetchData(page);
    }, [fetchData, page]);

    const handleStatusChange = async (id, status) => {
        await fetchData(page);
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
                        key={request._id}
                        request={request}
                        onStatusChange={handleStatusChange}
                    />
                ))}
        </Container>
        </>
    );
}

export default ReqPage;
