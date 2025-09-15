// Utility helper functions for the application

// Format date for display
export const formatDate = (date, language = 'en') => {
  const dateObj = new Date(date);
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const locales = {
    en: 'en-US',
    hi: 'hi-IN',
    ml: 'ml-IN'
  };

  return dateObj.toLocaleDateString(locales[language] || 'en-US', options);
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Validate Aadhaar number
export const isValidAadhaar = (aadhaar) => {
  const cleaned = aadhaar.replace(/\s/g, '');
  return /^\d{12}$/.test(cleaned);
};

// Generate random ID
export const generateId = (prefix = '') => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5);
  return `${prefix}${timestamp}${randomStr}`.toUpperCase();
};

// Calculate age from date of birth
export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// File size formatter
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Local storage helpers
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Session storage helpers
export const sessionStorage = {
  set: (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
    }
  }
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

// Download file
export const downloadFile = (data, filename, type = 'application/octet-stream') => {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Color utilities
export const getStatusColor = (status) => {
  const colors = {
    active: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900',
    pending: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900',
    inactive: 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900',
    rejected: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900',
    approved: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900',
    completed: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900',
    cancelled: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900'
  };
  
  return colors[status] || colors.inactive;
};

// Role-based utilities
export const getRoleColor = (role) => {
  const colors = {
    'Migrant Worker': 'from-blue-500 to-blue-600',
    'Doctor': 'from-green-500 to-green-600',
    'Admin': 'from-purple-500 to-purple-600'
  };
  
  return colors[role] || 'from-gray-500 to-gray-600';
};

// Health card ID generator
export const generateHealthCardId = (userType, location = 'IND') => {
  const prefix = userType === 'migrant' ? 'MIG' : 'DOC';
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `${prefix}-${year}-${random}`;
};

// Medical record ID generator
export const generateMedicalRecordId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `MED-${timestamp}-${random}`;
};

// Appointment ID generator
export const generateAppointmentId = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `APT-${date}-${random}`;
};

// Language direction helper
export const getLanguageDirection = (language) => {
  const rtlLanguages = ['ar', 'he', 'ur'];
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
};

// Mock data generators for development
export const mockDataGenerators = {
  generateMigrantWorker: () => ({
    id: generateId('MIG'),
    name: 'राजेश कुमार',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    aadhaar: '1234-5678-9012',
    dateOfBirth: '1985-08-15',
    gender: 'male',
    address: 'Mumbai, Maharashtra',
    emergencyContact: '+91 98765 43211',
    healthCardId: generateHealthCardId('migrant'),
    bloodGroup: 'B+',
    status: 'active',
    createdAt: new Date().toISOString()
  }),

  generateDoctor: () => ({
    id: generateId('DOC'),
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43220',
    registrationNumber: 'MH-2018-12345',
    specialization: 'General Medicine',
    clinic: 'Primary Health Center, Mumbai',
    verified: true,
    rating: 4.8,
    consultations: 245,
    status: 'active',
    createdAt: new Date().toISOString()
  }),

  generateMedicalRecord: () => ({
    id: generateMedicalRecordId(),
    patientId: generateId('MIG'),
    doctorId: generateId('DOC'),
    diagnosis: 'Diabetes Management',
    prescription: 'Metformin 500mg twice daily',
    notes: 'Patient shows good compliance with medication',
    visitDate: new Date().toISOString(),
    nextFollowUp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed'
  }),

  generateAppointment: () => ({
    id: generateAppointmentId(),
    patientId: generateId('MIG'),
    doctorId: generateId('DOC'),
    patientName: 'राजेश कुमार',
    doctorName: 'Dr. Priya Sharma',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    time: '10:00 AM',
    type: 'consultation',
    status: 'scheduled',
    notes: 'Regular checkup'
  })
};

export default {
  formatDate,
  formatPhoneNumber,
  isValidEmail,
  isValidPhone,
  isValidAadhaar,
  generateId,
  calculateAge,
  formatFileSize,
  storage,
  sessionStorage,
  debounce,
  throttle,
  copyToClipboard,
  downloadFile,
  getStatusColor,
  getRoleColor,
  generateHealthCardId,
  generateMedicalRecordId,
  generateAppointmentId,
  getLanguageDirection,
  mockDataGenerators
};