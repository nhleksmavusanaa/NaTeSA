const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
    // Auth endpoints
    async register(userData) {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for sessions
            body: JSON.stringify(userData),
        });
        return await response.json();
    },

    async login(credentials) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });
        return await response.json();
    },

    async logout() {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        return await response.json();
    },

    async checkAuth() {
        const response = await fetch(`${API_BASE_URL}/auth/check-auth`, {
            credentials: 'include',
        });
        return await response.json();
    },

    // User endpoints
    async getUsers() {
        const response = await fetch(`${API_BASE_URL}/users/`, {
            credentials: 'include',
        });
        return await response.json();
    },

    async getProfile() {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            credentials: 'include',
        });
        return await response.json();
    }
};