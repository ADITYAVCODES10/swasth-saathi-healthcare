// API utility functions for backend integration
// All functions include error handling and use environment variables

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL + '/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('API Request Error:', error);
    return { data: null, error: error.message };
  }
};

// Authentication APIs
export const authAPI = {
  // Register new user
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Logout user
  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  // Get current user profile
  getProfile: async (token) => {
    return apiRequest('/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Migrant Worker APIs
export const migrantAPI = {
  // Create migrant worker profile
  createProfile: async (profileData, token) => {
    return apiRequest('/migrant/profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Get migrant worker profile
  getProfile: async (userId, token) => {
    return apiRequest(`/migrant/profile/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Update migrant worker profile
  updateProfile: async (userId, profileData, token) => {
    return apiRequest(`/migrant/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Get medical history
  getMedicalHistory: async (userId, token) => {
    return apiRequest(`/migrant/medical-history/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Get appointments
  getAppointments: async (userId, token) => {
    return apiRequest(`/migrant/appointments/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Upload medical documents
  uploadDocuments: async (userId, files, token) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`document_${index}`, file);
    });

    return apiRequest(`/migrant/documents/${userId}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Doctor APIs
export const doctorAPI = {
  // Register doctor
  register: async (doctorData, token) => {
    return apiRequest('/doctor/register', {
      method: 'POST',
      body: JSON.stringify(doctorData),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Get doctor profile
  getProfile: async (doctorId, token) => {
    return apiRequest(`/doctor/profile/${doctorId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Search patients
  searchPatients: async (query, token) => {
    return apiRequest(`/doctor/patients/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Get patient history
  getPatientHistory: async (patientId, token) => {
    return apiRequest(`/doctor/patients/${patientId}/history`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Add medical record
  addMedicalRecord: async (recordData, token) => {
    return apiRequest('/doctor/medical-records', {
      method: 'POST',
      body: JSON.stringify(recordData),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Get doctor statistics
  getStatistics: async (doctorId, token) => {
    return apiRequest(`/doctor/statistics/${doctorId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Admin APIs
export const adminAPI = {
  // Get system overview
  getOverview: async (token) => {
    return apiRequest('/admin/overview', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Get all users
  getUsers: async (page = 1, limit = 20, token) => {
    return apiRequest(`/admin/users?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Approve user application
  approveUser: async (userId, token) => {
    return apiRequest(`/admin/users/${userId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Reject user application
  rejectUser: async (userId, reason, token) => {
    return apiRequest(`/admin/users/${userId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Get analytics data
  getAnalytics: async (dateRange, token) => {
    return apiRequest(`/admin/analytics?range=${dateRange}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Export data
  exportData: async (type, format, token) => {
    return apiRequest(`/admin/export/${type}?format=${format}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Get activity logs
  getActivityLogs: async (page = 1, limit = 50, token) => {
    return apiRequest(`/admin/activity-logs?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Notification APIs
export const notificationAPI = {
  // Get user notifications
  getNotifications: async (userId, token) => {
    return apiRequest(`/notifications/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Mark notification as read
  markAsRead: async (notificationId, token) => {
    return apiRequest(`/notifications/${notificationId}/read`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Send notification (admin only)
  sendNotification: async (notificationData, token) => {
    return apiRequest('/notifications/send', {
      method: 'POST',
      body: JSON.stringify(notificationData),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// File upload utility
export const uploadAPI = {
  // Upload single file
  uploadFile: async (file, type, userId, token) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('userId', userId);

    return apiRequest('/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  // Upload multiple files
  uploadFiles: async (files, type, userId, token) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    formData.append('type', type);
    formData.append('userId', userId);

    return apiRequest('/upload/multiple', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Mock data generators for development
export const mockData = {
  generateUsers: () => [
    { id: '1', name: 'राजेश कुमार', type: 'migrant', phone: '+91 9876543210', status: 'active' },
    { id: '2', name: 'Dr. Priya Sharma', type: 'doctor', phone: '+91 9876543211', status: 'verified' },
    { id: '3', name: 'Admin User', type: 'admin', phone: '+91 9876543212', status: 'active' },
  ],

  generateAppointments: () => [
    { id: '1', patientName: 'राजेश कुमार', date: '2024-01-20', time: '10:00 AM', status: 'scheduled' },
    { id: '2', patientName: 'Anil Nair', date: '2024-01-20', time: '11:00 AM', status: 'completed' },
    { id: '3', patientName: 'Mohammed Ali', date: '2024-01-21', time: '09:00 AM', status: 'scheduled' },
  ],

  generateAnalytics: () => ({
    dailyUsers: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: Math.floor(Math.random() * 50) + 10
    })),
    appointmentsBySpecialty: [
      { specialty: 'General Medicine', count: 120 },
      { specialty: 'Cardiology', count: 80 },
      { specialty: 'Orthopedics', count: 60 },
      { specialty: 'Dermatology', count: 40 },
    ],
    diseaseDistribution: [
      { name: 'Diabetes', value: 30 },
      { name: 'Hypertension', value: 25 },
      { name: 'Respiratory Issues', value: 20 },
      { name: 'Skin Conditions', value: 15 },
      { name: 'Others', value: 10 },
    ]
  }),
};