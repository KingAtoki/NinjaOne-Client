const BASE_URL = import.meta.env.VITE_BASE_URL;

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
    }
    return await response.json();
};

export const get = async () => {
    try {
        const response = await fetch(`${BASE_URL}/devices`, {
            headers: DEFAULT_HEADERS,
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
};

export const post = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/devices`, {
            method: 'POST',
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(data),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('POST request failed:', error);
        throw error;
    }
};

export const put = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/devices/${data.id}`, {
            method: 'PUT',
            headers: DEFAULT_HEADERS,
            body: JSON.stringify(data),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('PUT request failed:', error);
        throw error;
    }
};

// Delete is a reserved word in JavaScript, so we can't use it as a function name.
export const deleteEndpoint = async (deviceId) => {
    try {
        const response = await fetch(`${BASE_URL}/devices/${deviceId}`, {
            method: 'DELETE',
            headers: DEFAULT_HEADERS,
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('DELETE request failed:', error);
        throw error;
    }
};