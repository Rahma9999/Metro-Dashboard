const loginWithRetry = async (credentials, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
        const response = await fetch('https://metrodb-production.up.railway.app/api/v1/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        if (response.status === 429) {
            const waitTime = delay * (i + 1); // exponential backoff
            console.warn(`Rate limited. Retrying in ${waitTime}ms...`);
            await new Promise(res => setTimeout(res, waitTime));
            continue;
        }

        return await response.json();
        } catch (err) {
        if (i === retries - 1) throw err;
        }
    }
};

export default loginWithRetry;