import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { SubscriptionController } from '../controllers/SubscriptionController';
import DBModal from '../component/DBModal';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { TypeBadge, StatusBadge } from '../services/Badge';
import { formatDate } from '../services/FormatData';

const FILE_TYPES = [
    { key: 'photo', label: 'Photo', type: 'photo' },
    { key: 'nationalId_front', label: 'National ID (front)'},
    { key: 'nationalId_back', label: 'National ID (back)'},
    { key: 'universityId', label: 'University ID'},
    { key: 'militaryId', label: 'Military ID'},
];

function FileChip({ subId, docType, label, type }) {
    const { fetchDocument } = SubscriptionController();

    const handleOpen = async () => {
        try {
            const blob = await fetchDocument(subId, docType);
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        } catch (err) {
            console.error('File open error:', err);
        }
    };

    return (
        <button
            onClick={handleOpen}
            className="metro-file-chip"
            style={{ border: 'none', background: 'none' }}
        >
            <span className="metro-file-chip__icon">
                <IoDocumentAttachOutline />
            </span>
            {label}
        </button>
    );
}


function RequestCard({ request, onStatusChange }) {
    const theme = localStorage.getItem('app-theme') || 'light';
    const { changeStatus } = SubscriptionController();

    const availableFiles = FILE_TYPES.filter(
        file => request.documents?.[file.key]
    );

    const [status, setStatus]   = useState(request.status);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);

    // ── Reject-mail modal state ───────────────────────────────────
    const [modalShow, setModalShow] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [modalId,   setModalId]   = useState(null);

    const isPending = status === 'pending';
    const handleAccept = async () => {
        setLoading(true);
        setError(null);
        try {
            const updated = await changeStatus(request._id, { status: 'accepted' });
            onStatusChange?.(updated);
            setStatus('accepted');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
    setModalId(request._id);
    setModalMode('rejectMail');
    setModalShow(true);

    try {
        setLoading(true);
        const updated = await changeStatus(request._id, { status: 'rejected' });

        setStatus('rejected');
        onStatusChange?.(updated);

    } catch (err) {
        setError(err.response?.data?.message || err.message);
    } finally {
        setLoading(false);
    }
};
    return (
        <>
            <Card bg={theme} className="metro-card mb-3">
                <Card.Body className="p-3">

                    <div className="d-flex align-items-start g-2 mb-2">
                        <div className="request-card__info">
                            <div className="request-card__name">{request.user?.name}</div>
                            <div className="request-card__email">{request.user?.email}</div>

                            <div className="request-card__meta">
                                <TypeBadge type={request.type?.category?.en} />
                                <span className="request-card__date">
                                    {formatDate(request.createdAt)}
                                    {request.university && ` · ${request.university}`}
                                </span>
                            </div>
                        </div>
                        <StatusBadge status={status} />
                    </div>

                        {availableFiles.length > 0 && (
                        <div className="request-card__files">
                            {availableFiles.map(file => (
                                <FileChip
                                    key={file.key}
                                    subId={request._id}
                                    docType={file.key}
                                    label={file.label}
                                    type={file.type}
                                />
                            ))}
                        </div>
                    )}
                    {/* Error message */}
                    {error && (
                        <div className="text-danger small mt-1">{error}</div>
                    )}
                    {isPending && (
                        <div className="request-card__actions">
                            <button
                                className="metro-btn metro-btn--accept"
                                onClick={handleAccept}
                                disabled={loading}
                            >
                                {loading ? 'Saving…' : 'Accept'}
                            </button>

                            <button
                                className="metro-btn metro-btn--reject"
                                onClick={handleReject}
                                disabled={loading}
                            >
                                {loading ? 'Saving…' : 'Reject'}
                            </button>
                        </div>
                    )}
                </Card.Body>
            </Card>

            <DBModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                mode={modalMode}
                id={modalId}
                requestData={request}
            />
        </>
    );
}

export default RequestCard;
