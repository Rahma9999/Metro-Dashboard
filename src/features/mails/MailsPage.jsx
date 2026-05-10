import React, { useEffect, useState } from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import MailCard from '../../component/MailCard';
import { SubscriptionController } from '../../controllers/SubscriptionController';
import '../../styles/SubStyle.css'
import { usePagination } from '../../services/usePagination';

function MailsPage() {

    const { getAllMails } = SubscriptionController();

    const [mails, setMails] = useState([]);
    const {state:{error, loading}, dispatch} = usePagination();

    const theme = localStorage.getItem('app-theme') || 'light';

    useEffect(() => {

        const fetchMails = async () => {
            try {
                dispatch({ type: 'loading' });
                const data = await getAllMails();
                setMails(data || []);
            } catch (err) {
                dispatch({type: 'setError', payload: ( err.message || 'Failed to fetch mails.')});
            } finally {
                dispatch({type:'unloading'});
            }
        };

        fetchMails();
    }, []);

    if (loading) {
        return (
            <div className="position-absolute top-50 start-50 translate-middle">
                <Spinner
                    animation="border"
                    variant={theme === 'dark' ? 'light' : 'dark'}
                />
            </div>
        );
    }

    return (
        <Container className="py-3">
            <h2 className='txtTitle mb-3'>Emails History</h2>

            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            {!loading && mails.length === 0 && (
                <Alert variant="secondary">
                    No email history found.
                </Alert>
            )}

            {mails.map((mail) => (
                <MailCard
                    key={mail._id}
                    mail={mail}
                />
            ))}

        </Container>
    );
}

export default MailsPage;