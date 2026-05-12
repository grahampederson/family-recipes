// API configuration
const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || `HTTP error! status: ${response.status}`);
        }

        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Family Members API
const familyAPI = {
    list: () => apiCall('/family-members'),
    get: (id) => apiCall(`/family-members/${id}`),
    create: (data) => apiCall('/family-members', 'POST', data),
    update: (id, data) => apiCall(`/family-members/${id}`, 'PUT', data),
    delete: (id) => apiCall(`/family-members/${id}`, 'DELETE'),
};

// Allergies API (placeholder for when we need it)
const allergyAPI = {
    list: () => apiCall('/allergies'),
    create: (data) => apiCall('/allergies', 'POST', data),
};

// Preferences API (placeholder)
const preferenceAPI = {
    list: () => apiCall('/preferences'),
    create: (data) => apiCall('/preferences', 'POST', data),
};
