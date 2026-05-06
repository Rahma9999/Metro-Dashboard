import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import axiosInstance from '../../services/axiosInstance';

/**
 * RejectMailModal
 *
 * Rendered inside DBModal when mode === 'rejectMail'.
 *
 * Props:
 *  @param {string|number} id          - Subscription / request ID (from DBModal)
 *  @param {object}        requestData - Full request object forwarded by DBModal
 *  @param {function}      onHide      - Close the modal (from DBModal)
 */
function RejectMailModal({ id, requestData = {}, onHide }) {
    const defaultBody = `Dear ${requestData.name ?? 'Applicant'},\n\nThank you for your subscription request. After careful review, we regret to inform you that your application has not been approved at this time.\n\nIf you have any questions, please do not hesitate to contact us.\n\nBest regards,\nThe Team`;

    const [to,      setTo]      = useState(requestData.email ?? '');
    const [subject, setSubject] = useState('Your Subscription Request — Update');
    const [body,    setBody]    = useState(defaultBody);
    const [sending, setSending] = useState(false);
    const [sent,    setSent]    = useState(false);
    const [error,   setError]   = useState(null);

    const handleSend = async () => {
        if (!to || !subject || !body) return;
        setSending(true);
        setError(null);
        try {
            await axiosInstance.post(`/subscriptions/${id}/reject-mail`, {
                to,
                subject,
                body,
            });
            setSent(true);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                'Failed to send email.'
            );
        } finally {
            setSending(false);
        }
    };

    // ── Success state ─────────────────────────────────────────────
    if (sent) {
        return (
            <div className="text-center py-4">
                <div style={{ fontSize: '2.5rem' }}>✉️</div>
                <h5 className="mt-2 mb-1">Email sent!</h5>
                <p className="text-muted small">
                    Rejection notice delivered to <strong>{to}</strong>.
                </p>
                <Button variant="secondary" size="sm" onClick={onHide}>
                    Close
                </Button>
            </div>
        );
    }

    // ── Compose form ──────────────────────────────────────────────
    return (
        <div>
            <h5 className="mb-3">Send Rejection Email</h5>

            <Form>
                {/* To */}
                <Form.Group className="mb-3" controlId="rejectTo">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        type="email"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="recipient@example.com"
                    />
                </Form.Group>

                {/* Subject */}
                <Form.Group className="mb-3" controlId="rejectSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </Form.Group>

                {/* Body */}
                <Form.Group className="mb-3" controlId="rejectBody">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={7}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </Form.Group>

                {/* Error */}
                {error && (
                    <p className="text-danger small">{error}</p>
                )}

                {/* Actions */}
                <div className="d-flex gap-2 justify-content-end">
                    <Button variant="secondary" onClick={onHide} disabled={sending}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleSend}
                        disabled={sending || !to || !subject || !body}
                    >
                        {sending ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-1" />
                                Sending…
                            </>
                        ) : (
                            'Send Email'
                        )}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default RejectMailModal;
