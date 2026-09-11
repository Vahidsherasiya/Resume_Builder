const API_BASE_URL = '/api/resumes';

export const api = {
  // Get active or default resume
  async getResume(id = 'resume-default-01') {
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`);
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

      const res = await fetch(`${API_BASE_URL}`, {
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
  }
};
