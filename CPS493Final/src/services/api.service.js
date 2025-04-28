const API_URL = 'http://localhost:3000/api';

class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

async function fetchWithAuth(endpoint, options = {}) {
    console.log(`API Call to ${endpoint}:`, options)
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });
        const data = await response.json();
        console.log(`API Response from ${endpoint}:`, data)

        if (!response.ok) {
            throw new ApiError(data.message || 'API request failed', response.status);
        }

        return data;
    } catch (error) {
        console.error(`API Error for ${endpoint}:`, error);
        throw error;
    }
}

export const api = {
    // Auth endpoints
    async login(credentials) {
        // Don't use fetchWithAuth for login
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new ApiError(data.message || 'Login failed', response.status);
        }
        return data;
    },

    async register(userData) {
        // Don't use fetchWithAuth for register
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new ApiError(data.message || 'Registration failed', response.status);
        }
        return data;
    },

    // Activities endpoints
    async getActivities() {
        return fetchWithAuth('/activities');
    },

    async createActivity(activity) {
        return fetchWithAuth('/activities', {
            method: 'POST',
            body: JSON.stringify(activity),
        });
    },

    async updateActivity(id, updates) {
        return fetchWithAuth(`/activities/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    },

    async deleteActivity(id) {
        return fetchWithAuth(`/activities/${id}`, {
            method: 'DELETE',
        });
    },

    // Friends endpoints
    async getFriends() {
        return fetchWithAuth('/friends');
    },

    async getFriendActivities() {
        return fetchWithAuth('/activities/friends');
    },

    async addFriend(friendId) {
        return fetchWithAuth('/friends/add', {
            method: 'POST',
            body: JSON.stringify({ friendId }),
        });
    },

    async removeFriend(friendId) {
        return fetchWithAuth(`/friends/${friendId}`, {
            method: 'DELETE',
        });
    }
};
