const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = (token: string) => ({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
});

// Generic API call function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API call failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API call error for ${endpoint}:`, error);
    throw error;
  }
};

// Appointments API
export const appointmentsApi = {
  // Get user appointments
  getUserAppointments: async (token: string) => {
    return apiCall('/appointments', {
      headers: getAuthHeaders(token),
    });
  },

  // Create new appointment
  createAppointment: async (token: string, appointmentData: any) => {
    return apiCall('/appointments', {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(appointmentData),
    });
  },

  // Update appointment
  updateAppointment: async (token: string, appointmentId: string, updateData: any) => {
    return apiCall(`/appointments/${appointmentId}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(updateData),
    });
  },

  // Cancel appointment
  cancelAppointment: async (token: string, appointmentId: string) => {
    return apiCall(`/appointments/${appointmentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });
  },
};

// Doctors API
export const doctorsApi = {
  // Get all doctors with optional filtering
  getDoctors: async (token: string, filters?: {
    specialty?: string;
    search?: string;
    available?: boolean;
  }) => {
    const params = new URLSearchParams();
    if (filters?.specialty) params.append('specialty', filters.specialty);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.available !== undefined) params.append('available', filters.available.toString());

    const queryString = params.toString();
    const endpoint = queryString ? `/doctors?${queryString}` : '/doctors';

    return apiCall(endpoint, {
      headers: getAuthHeaders(token),
    });
  },

  // Get doctor by ID
  getDoctorById: async (token: string, doctorId: string) => {
    return apiCall(`/doctors/${doctorId}`, {
      headers: getAuthHeaders(token),
    });
  },

  // Get all specialties
  getSpecialties: async (token: string) => {
    return apiCall('/doctors/specialties/list', {
      headers: getAuthHeaders(token),
    });
  },
};

// Lawyers API
export const lawyersApi = {
  // Get all lawyers with optional filtering
  getLawyers: async (token: string, filters?: {
    specialty?: string;
    search?: string;
    available?: boolean;
  }) => {
    const params = new URLSearchParams();
    if (filters?.specialty) params.append('specialty', filters.specialty);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.available !== undefined) params.append('available', filters.available.toString());

    const queryString = params.toString();
    const endpoint = queryString ? `/lawyers?${queryString}` : '/lawyers';

    return apiCall(endpoint, {
      headers: getAuthHeaders(token),
    });
  },

  // Get lawyer by ID
  getLawyerById: async (token: string, lawyerId: string) => {
    return apiCall(`/lawyers/${lawyerId}`, {
      headers: getAuthHeaders(token),
    });
  },

  // Get all specialties
  getSpecialties: async (token: string) => {
    return apiCall('/lawyers/specialties/list', {
      headers: getAuthHeaders(token),
    });
  },
};

// Emergency Reports API (mock for now)
export const emergencyReportsApi = {
  // Submit emergency report
  submitReport: async (token: string, reportData: any) => {
    // This would be a real API endpoint in production
    // For now, we'll simulate a successful submission
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: 'Emergency report submitted successfully',
          reportId: Date.now().toString(),
          status: 'submitted',
          timestamp: new Date().toISOString(),
        });
      }, 1000);
    });
  },

  // Get user's emergency reports
  getUserReports: async (token: string) => {
    // Mock data for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          reports: [
            {
              id: '1',
              type: 'Car Accident',
              description: 'Rear-ended at traffic light',
              location: '123 Main St, City',
              status: 'investigating',
              createdAt: '2024-01-15T10:30:00Z',
            },
            {
              id: '2',
              type: 'Slip & Fall',
              description: 'Slipped on wet floor at grocery store',
              location: '456 Market St, City',
              status: 'resolved',
              createdAt: '2024-01-10T14:20:00Z',
            },
          ],
        });
      }, 500);
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiCall('/health');
}; 