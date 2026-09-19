const BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';
const API_RESUMES = `${BASE_URL}/api/resumes`;
const API_AUTH = `${BASE_URL}/api/auth`;

export const api = {
  // Auth: Login
  async login({ email, password }) {
    try {
      const res = await fetch(`${API_AUTH}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }
      if (data.user) {
        localStorage.setItem('resume_auth_user', JSON.stringify(data.user));
        localStorage.setItem('resume_auth_token', data.token || '');
      }
      return data;
    } catch (err) {
      // If error is from backend with message, propagate it
      if (err.message && !err.message.includes('fetch')) {
        throw err;
      }

      // Fallback only for network disconnect
      console.warn('Network offline, checking offline fallback credentials:', err.message);
      const normalized = email.toLowerCase().trim();
      if ((normalized === 'admin@autoresume.com' || normalized === 'admin@enhancv.com') && password === 'admin123') {
        const adminUser = {
          id: 'user-admin-01',
          name: 'Master Admin',
          email: 'admin@autoresume.com',
          role: 'admin'
        };
        localStorage.setItem('resume_auth_user', JSON.stringify(adminUser));
        return { success: true, user: adminUser, token: 'offline-token' };
      } else if ((normalized === 'user@autoresume.com' || normalized === 'user@enhancv.com') && password === 'user123') {
        const standardUser = {
          id: 'user-default-01',
          name: 'Alex Morgan',
          email: 'user@autoresume.com',
          role: 'user'
        };
        localStorage.setItem('resume_auth_user', JSON.stringify(standardUser));
        return { success: true, user: standardUser, token: 'offline-token' };
      }
      throw new Error('Invalid email or password. Please verify credentials or register.');
    }
  },

  // Auth: Register
  async register({ name, email, password }) {
    try {
      const res = await fetch(`${API_AUTH}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      if (data.user) {
        localStorage.setItem('resume_auth_user', JSON.stringify(data.user));
        localStorage.setItem('resume_auth_token', data.token || '');
      }
      return data;
    } catch (err) {
      if (err.message && !err.message.includes('fetch')) {
        throw err;
      }
      console.warn('Network offline, registering locally:', err.message);
      const normalized = email.toLowerCase().trim();
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email: normalized,
        role: (normalized === 'admin@autoresume.com' || normalized === 'admin@enhancv.com') ? 'admin' : 'user'
      };
      localStorage.setItem('resume_auth_user', JSON.stringify(newUser));
      return { success: true, user: newUser, token: 'offline-token' };
    }
  },

  // Get active or default resume
  async getResume(id = 'resume-default-01') {
    try {
      const res = await fetch(`${API_RESUMES}/${id}`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('Backend unavailable, falling back to local storage:', err.message);
      const local = localStorage.getItem(`resume_${id}`);
      return local ? JSON.parse(local) : null;
    }
  },

  // Save resume to MongoDB / API
  async saveResume(resume) {
    try {
      // Also cache in local storage
      localStorage.setItem(`resume_${resume.id || 'resume-default-01'}`, JSON.stringify(resume));

      const res = await fetch(`${API_RESUMES}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resume)
      });

      if (!res.ok) throw new Error('Failed to save to server');
      return await res.json();
    } catch (err) {
      console.warn('Saved to LocalStorage (Backend offline or disconnected):', err.message);
      return { success: true, localOnly: true, data: resume };
    }
  },

  // Admin: Get all users
  async getUsers() {
    try {
      const res = await fetch(`${API_AUTH}/users`);
      if (!res.ok) throw new Error('Failed to fetch users');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, returning cached/mock users list:', err.message);
      const cached = localStorage.getItem('admin_users_list');
      if (cached) return JSON.parse(cached);
      return [
        { id: 'u1', name: 'Admin Manager', email: 'admin@autoresume.com', role: 'admin', createdAt: new Date().toISOString() },
        { id: 'u2', name: 'Alex Morgan', email: 'user@autoresume.com', role: 'user', createdAt: new Date().toISOString() },
        { id: 'u3', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'user', createdAt: new Date(Date.now() - 86400000).toISOString() }
      ];
    }
  },

  // Admin: Update user role
  async updateUserRole(userId, newRole) {
    try {
      const res = await fetch(`${API_AUTH}/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (!res.ok) throw new Error('Failed to update role');
      return await res.json();
    } catch (err) {
      console.warn('Updating role locally:', err.message);
      return { success: true, localOnly: true };
    }
  }
};
