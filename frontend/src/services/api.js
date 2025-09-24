// src/services/api.js
const API_BASE_URL = 'http://127.0.0.1:5000'; // Remove /api since your route is /create_user


export const apiService = {
  async register(userData) {
    try {
      console.log('Sending registration data:', userData);
      
      const apiData = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        branch_id: userData.branch_id,
        is_bec_member: userData.is_bec_member ? 'yes' : 'no',
        nec_position: userData.nec_position || 'N/A',  // Add this line
        bec_position: userData.bec_position || 'no',
        status: userData.status || 'active'
      };

      const response = await fetch(`${API_BASE_URL}/create_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || `Registration failed: ${response.status}`);
      }

      return data;

    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
    },

 async login(credentials) {
    try {
      console.log('Sending login request:', credentials);
      
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });

      console.log('Login response status:', response.status);
      
      const data = await response.json();
      console.log('Login response data:', data);

      if (!response.ok) {
        throw new Error(data.error || data.message || `Login failed: ${response.status}`);
      }

      return data;

    } catch (error) {
      console.error('Login API call failed:', error);
      throw error;
    }
    },

    async getUsers(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE_URL}/users?${params}`);
        return await response.json();
    },
    
    async getBranches() {
        const response = await fetch(`${API_BASE_URL}/branches`);
        return await response.json();
    },
    
    async getBranch(branchId) {
        const response = await fetch(`${API_BASE_URL}/branches/${branchId}`);
        return await response.json();
    },
    
    async getEvents(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE_URL}/events?${params}`);
        return await response.json();
    },
    
    async getNews(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE_URL}/news?${params}`);
        return await response.json();
    },
    
    async getAlumni() {
        const response = await fetch(`${API_BASE_URL}/alumni`);
        return await response.json();
    }
    
    
};

