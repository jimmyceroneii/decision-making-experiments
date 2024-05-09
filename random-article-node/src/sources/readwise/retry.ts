const MAX_RETRIES = 5;
const INITIAL_BACKOFF = 60010; // in milliseconds

const token = process.env.READWISE_API_TOKEN || '';

export const sendRequestWithRetry = async <T>(url: string, retries: number = 0): Promise<T> => {
    try {
        console.log('token: ', token)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        const data = await response.json();

        if (data['detail'].includes('throttled')) {
            throw new Error(`throttled on retry #${retries}...`);
        }

        return data;
    } catch (error) {
        console.log("backing off to retry...", error);
        if (retries < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, INITIAL_BACKOFF));
            return sendRequestWithRetry(url, retries + 1);
        } else {
            throw new Error(`Max retries reached (${MAX_RETRIES})`);
        }
    }
}
