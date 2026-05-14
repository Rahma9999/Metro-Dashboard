import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import { usePagination } from '../../services/usePagination';
import { FaCheckCircle } from 'react-icons/fa';
import { ThemeContext } from '../../services/ThemeContext';
import { SubscriptionController } from '../../controllers/SubscriptionController';

function RejectMailModal({ id, onHide, onStatusChange }) {
    const [reason, setReason] = useState('');
    const [success, setSuccess] = useState(false);
    const {state:{error, loading}, dispatch} = usePagination();
    const {theme} = useContext(ThemeContext);
    const { changeStatus } = SubscriptionController();

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                onHide();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success, onHide]);

    const handleReject = async () => {
        if (!reason.trim()) return;

        dispatch({ type: 'loading' });

        try {
            // await axiosInstance.patch(`/subscriptions/${id}/status`, {
            //     status: 'rejected',
            //     rejectionReason: reason,
            // });
            await changeStatus(id, 'rejected', reason);
            setSuccess(true);
            onStatusChange?.();
        } catch (err) {
            dispatch({type: 'setError', payload: ( err.message || 'Failed to reject subscription.')});
        } finally {
            dispatch({type:'unloading'});
        }
    };

    // Success UI
    if (success) {
        return (
            <div className="text-center py-4">
                <div style={{ fontSize: '2.5rem' }}><FaCheckCircle color={theme === "light" ? "black" : "white"} /></div>

                <h5 className="mt-3">Subscription Rejected</h5>

                <p className="text-muted small">
                    Rejection email has been sent successfully.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h5 className="mb-3">Reject Subscription</h5>

            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Rejection Reason</Form.Label>

                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter rejection reason..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Form.Group>

                {error && (
                    <Alert variant="danger" className="py-2">
                        {error}
                    </Alert>
                )}

                <div className="d-flex justify-content-end gap-2">
                    {/* <Button
                        variant="secondary"
                        onClick={onHide}
                        disabled={loading}
                    >
                        Cancel
                    </Button> */}

                    <Button
                        variant="danger"
                        onClick={handleReject}
                        disabled={loading || !reason.trim()}
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    animation="border"
                                    size="sm"
                                    className="me-2"
                                />
                                Rejecting...
                            </>
                        ) : (
                            'Reject & Send Email'
                        )}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default RejectMailModal;