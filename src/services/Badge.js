export function TypeBadge({ type }) {
    const safeType = (type === "special needs")? "special-needs": type;
    return (
        <span className={`metro-badge metro-badge--${safeType}`}>
            {type}
        </span>
    );
}

export function StatusBadge({ status }) {
    console.log('statusBadge: ', status)
    return (
        <span className={`metro-badge metro-badge--${status}`}>
            {status}
        </span>
    );
}

export function MailTypeBadge({ status }) {
    return (
        <span className={`metro-badge mail-badge--${status}`}>
            {status}
        </span>
    );
}
