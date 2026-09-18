import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ResumeCanvas from './components/Canvas/ResumeCanvas';
import Dashboard from './components/Dashboard/Dashboard';
import AdminPanel from './components/Admin/AdminPanel';
import AuthModal from './components/Auth/AuthModal';
import { RESUME_TEMPLATES } from './types/templatesData';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const cachedUser = localStorage.getItem('resume_auth_user');
      return cachedUser ? JSON.parse(cachedUser) : null;
    } catch (e) {
      return null;
    }
  });

  // Current View: 'dashboard' | 'editor' | 'admin'
  const [currentView, setCurrentView] = useState(() => {
    return 'dashboard';
  });

  // Dynamic templates collection (built-in + admin added)
  const [allTemplates, setAllTemplates] = useState(() => {
    try {
      const custom = localStorage.getItem('custom_admin_templates_v2');
      if (custom) {
        const parsed = JSON.parse(custom);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...RESUME_TEMPLATES];
        }
      }
    } catch (e) {}
    return RESUME_TEMPLATES;
  });

  // Track downloads & usage counts per template
  const [templateMetrics, setTemplateMetrics] = useState(() => {
    try {
      const cached = localStorage.getItem('template_metrics_v2');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {}
    // Baseline starter counts
    return {
      'template-modern-enhancv': { downloads: 142, uses: 380 },
      'template-tech-minimal': { downloads: 98, uses: 245 },
      'template-executive-navy': { downloads: 115, uses: 290 },
      'template-creative-coral': { downloads: 86, uses: 210 },
      'template-ats-clean': { downloads: 174, uses: 430 },
      'template-academic-serif': { downloads: 64, uses: 160 },
      'template-dark-sidebar': { downloads: 128, uses: 310 },
      'template-compact-emerald': { downloads: 104, uses: 260 },
      'template-startup-bold': { downloads: 77, uses: 195 },
      'template-classic-corporate': { downloads: 92, uses: 220 }
    };
  });

  // Sync metrics to localStorage
  useEffect(() => {
    localStorage.setItem('template_metrics_v2', JSON.stringify(templateMetrics));
  }, [templateMetrics]);

  const incrementTemplateUse = (templateId) => {
    setTemplateMetrics((prev) => {
      const current = prev[templateId] || { downloads: 20, uses: 50 };
      return {
        ...prev,
        [templateId]: {
          ...current,
          uses: current.uses + 1
        }
      };
    });
  };

  const incrementTemplateDownload = (templateId) => {
    setTemplateMetrics((prev) => {
      const current = prev[templateId] || { downloads: 20, uses: 50 };
      return {
        ...prev,
        [templateId]: {
          ...current,
          downloads: current.downloads + 1
        }
      };
    });
  };

  // Get storage key for current user's saved resumes
  const getUserResumesKey = (user) => {
    if (!user) return 'user_saved_resumes_guest';
    return `user_saved_resumes_${user.id || user.email || 'guest'}`;
  };

  // List of saved resumes for the user (starts empty [] if user hasn't created any)
  const [savedResumes, setSavedResumes] = useState(() => {
    try {
      const cachedUser = localStorage.getItem('resume_auth_user');
      if (cachedUser) {
        const u = JSON.parse(cachedUser);
        const key = `user_saved_resumes_${u.id || u.email || 'guest'}`;
        const cached = localStorage.getItem(key);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch (e) {}
    return [];
  });

  // Currently active resume being edited in the editor
  const [resume, setResume] = useState(() => {
    try {
      const cached = localStorage.getItem('active_resume_v2');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.header) {
          return parsed;
        }
      }
    } catch (e) {}
    return RESUME_TEMPLATES[0].sampleData;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const printRef = useRef(null);

  // Sync active resume to LocalStorage
  useEffect(() => {
    if (resume) {
      localStorage.setItem('active_resume_v2', JSON.stringify(resume));
    }
  }, [resume]);

  // Sync saved resumes list to LocalStorage under user-specific key
  useEffect(() => {
    if (currentUser) {
      const key = getUserResumesKey(currentUser);
      localStorage.setItem(key, JSON.stringify(savedResumes));
    }
  }, [savedResumes, currentUser]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    // Load resumes specific to this logged in user
    try {
      const userKey = getUserResumesKey(user);
      const userCached = localStorage.getItem(userKey);
      if (userCached) {
        const parsed = JSON.parse(userCached);
        setSavedResumes(Array.isArray(parsed) ? parsed : []);
      } else {
        setSavedResumes([]);
      }
    } catch (e) {
      setSavedResumes([]);
    }
    setCurrentView('dashboard');
    showToast(`Welcome, ${user.name || 'User'}! Please choose a template to begin.`, 'success');
  };

  const handleLogout = () => {
    localStorage.removeItem('resume_auth_user');
    localStorage.removeItem('resume_auth_token');
    setCurrentUser(null);
    setSavedResumes([]);
    setCurrentView('dashboard');
    showToast('Logged out successfully', 'success');
  };

  // Admin: Add new template design
  const handleAddNewTemplate = (newTemplate) => {
    const customList = JSON.parse(localStorage.getItem('custom_admin_templates_v2') || '[]');
    const updatedCustom = [newTemplate, ...customList];
    localStorage.setItem('custom_admin_templates_v2', JSON.stringify(updatedCustom));
    setAllTemplates([newTemplate, ...allTemplates]);
    showToast(`Template "${newTemplate.name}" is now available to all users!`, 'success');
  };

  // Admin: Delete custom template
  const handleDeleteCustomTemplate = (templateId) => {
    const customList = JSON.parse(localStorage.getItem('custom_admin_templates_v2') || '[]');
    const updatedCustom = customList.filter((t) => t.id !== templateId);
    localStorage.setItem('custom_admin_templates_v2', JSON.stringify(updatedCustom));
    setAllTemplates(allTemplates.filter((t) => t.id !== templateId));
    showToast('Template deleted successfully', 'success');
  };

  // Create new resume from a chosen template
  const handleCreateNewFromTemplate = (template) => {
    // Increment usage count for this template
    incrementTemplateUse(template.id);

    const newResume = JSON.parse(JSON.stringify(template.sampleData));
    newResume.id = `resume-${Date.now()}`;
    newResume.lastModified = new Date().toISOString();

    setResume(newResume);
    setSavedResumes((prev) => {
      const exists = prev.some((r) => r.id === newResume.id);
      return exists ? prev : [newResume, ...prev];
    });

    setCurrentView('editor');
    showToast(`Template "${template.name}" loaded with realistic dummy data!`, 'success');
  };

  // Switch template while keeping in editor
  const handleSelectTemplate = (template) => {
    if (template && template.sampleData) {
      incrementTemplateUse(template.id);
      const newResume = JSON.parse(JSON.stringify(template.sampleData));
      newResume.id = resume.id || `resume-${Date.now()}`;
      newResume.lastModified = new Date().toISOString();

      setResume(newResume);
      setSavedResumes((prev) => prev.map((r) => (r.id === newResume.id ? newResume : r)));
      showToast(`Applied "${template.name}" with sample dummy data!`, 'success');
    }
  };

  // Edit existing resume from Dashboard
  const handleEditResume = (targetResume) => {
    setResume(targetResume);
    setCurrentView('editor');
    showToast(`Opened "${targetResume.title || 'Resume'}" for editing`, 'success');
  };

  // Delete resume
  const handleDeleteResume = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const updated = savedResumes.filter((r) => r.id !== id);
      setSavedResumes(updated);
      showToast('Resume deleted', 'success');
    }
  };

  // Duplicate resume
  const handleDuplicateResume = (targetResume) => {
    const duplicated = JSON.parse(JSON.stringify(targetResume));
    duplicated.id = `resume-${Date.now()}`;
    duplicated.title = `${targetResume.title || 'Resume'} (Copy)`;
    duplicated.lastModified = new Date().toISOString();

    setSavedResumes((prev) => [duplicated, ...prev]);
    showToast('Resume duplicated successfully!', 'success');
  };

  // Save active resume
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedResume = {
        ...resume,
        lastModified: new Date().toISOString()
      };
      setResume(updatedResume);

      // Update in savedResumes list
      setSavedResumes((prev) => {
        const index = prev.findIndex((r) => r.id === updatedResume.id);
        if (index >= 0) {
          const next = [...prev];
          next[index] = updatedResume;
          return next;
        }
        return [updatedResume, ...prev];
      });

      const res = await api.saveResume(updatedResume);
      if (res.localOnly) {
        showToast('Saved locally in browser!', 'success');
      } else {
        showToast('Saved to MongoDB successfully!', 'success');
      }
    } catch (err) {
      showToast('Error saving resume', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all changes and reload fresh sample dummy data?')) {
      const currentStyle = resume.theme?.templateStyle || 'modern-enhancv';
      const matched = allTemplates.find((t) => t.id === currentStyle || t.theme.templateStyle === currentStyle) || allTemplates[0];
      const freshData = JSON.parse(JSON.stringify(matched.sampleData));
      freshData.id = resume.id || `resume-${Date.now()}`;
      setResume(freshData);
      showToast(`Reloaded sample dummy data for ${matched.name}`, 'success');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    showToast('Generating clean A4 PDF...', 'success');

    // Find current template and increment download count
    const activeStyle = resume.theme?.templateStyle || 'modern-enhancv';
    const matched = allTemplates.find(
      (t) => t.id === activeStyle || t.theme?.templateStyle === activeStyle
    ) || allTemplates[0];
    if (matched) {
      incrementTemplateDownload(matched.id);
    }

    const element = printRef.current;
    
    document.body.classList.add('exporting-pdf');
    element.classList.add('exporting-pdf');

    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      const dataUrl = await toPng(element, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: element.offsetWidth,
        height: element.offsetHeight,
        style: {
          margin: '0',
          marginLeft: '0',
          marginRight: '0',
          marginTop: '0',
          marginBottom: '0',
          transform: 'none',
          boxShadow: 'none'
        },
        skipFonts: true,
        fontEmbedCSS: '',
        filter: (node) => {
          if (!node.classList) return true;
          return !(
            node.classList.contains('no-print') ||
            node.classList.contains('hover-action-bar') ||
            node.classList.contains('gear-popup') ||
            node.classList.contains('btn-new-section') ||
            (node.closest && node.closest('.no-print'))
          );
        }
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = 210;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resume.header?.name?.replace(/\s+/g, '_') || 'Resume'}_Enhancv.pdf`);
      showToast('PDF downloaded successfully! (Download count updated)', 'success');
    } catch (err) {
      console.error('PDF Generation error:', err);
      window.print();
    } finally {
      document.body.classList.remove('exporting-pdf');
      element.classList.remove('exporting-pdf');
    }
  };

  return (
    <div className="min-h-screen bg-[#eaedf2] text-slate-800 flex flex-col font-sans">
      {/* Auth Modal Screen if user is not logged in */}
      {!currentUser && (
        <AuthModal onLoginSuccess={handleLoginSuccess} />
      )}

      {/* Top Navigation Bar */}
      <Navbar
        resume={resume}
        onResumeChange={setResume}
        onSave={handleSave}
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
        onReset={handleReset}
        onSelectTemplate={handleSelectTemplate}
        currentUser={currentUser}
        onLogout={handleLogout}
        currentView={currentView}
        onNavigateView={setCurrentView}
        templates={allTemplates}
        isSaving={isSaving}
      />

      {/* Main View Switching */}
      {currentView === 'dashboard' ? (
        <Dashboard
          savedResumes={savedResumes}
          currentUser={currentUser}
          templates={allTemplates}
          templateMetrics={templateMetrics}
          onEditResume={handleEditResume}
          onCreateNewFromTemplate={handleCreateNewFromTemplate}
          onDeleteResume={handleDeleteResume}
          onDuplicateResume={handleDuplicateResume}
        />
      ) : currentView === 'admin' ? (
        <AdminPanel
          currentUser={currentUser}
          templates={allTemplates}
          onAddNewTemplate={handleAddNewTemplate}
          onDeleteCustomTemplate={handleDeleteCustomTemplate}
        />
      ) : (
        <main className="flex-1 overflow-y-auto py-6 sm:py-10">
          <div className="max-w-5xl mx-auto px-2 sm:px-4">
            <ResumeCanvas
              resume={resume}
              onResumeChange={setResume}
              printRef={printRef}
            />
          </div>
        </main>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-2xl animate-popover text-xs font-semibold no-print">
          {toastMessage.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#00c598]" />
          )}
          <span>{toastMessage.msg}</span>
        </div>
      )}
    </div>
  );
}
