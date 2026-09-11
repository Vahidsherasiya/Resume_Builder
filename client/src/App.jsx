import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ResumeCanvas from './components/Canvas/ResumeCanvas';
import { defaultResume } from './types/defaultResume';
import { api } from './services/api';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [resume, setResume] = useState(() => {
    const cached = localStorage.getItem('active_resume_v2');
    return cached ? JSON.parse(cached) : defaultResume;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const printRef = useRef(null);

  // Auto-save to LocalStorage whenever resume changes
  useEffect(() => {
    localStorage.setItem('active_resume_v2', JSON.stringify(resume));
  }, [resume]);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await api.saveResume(resume);
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
    if (window.confirm('Reset all changes and load default Enhancv sample resume?')) {
      setResume(defaultResume);
      localStorage.setItem('active_resume_v2', JSON.stringify(defaultResume));
      showToast('Resume reset to default template', 'success');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    showToast('Generating clean A4 PDF...', 'success');

    const element = printRef.current;
    
    // Add exporting-pdf class to hide all buttons, popups, and + Add / + New Section tags
    document.body.classList.add('exporting-pdf');
    element.classList.add('exporting-pdf');

    // Deselect any active contenteditable selection to prevent blue selection rectangles
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }

    // Micro delay to let DOM reflow without editing artifacts
    await new Promise((resolve) => setTimeout(resolve, 150));

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // 2x high-resolution capture
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        ignoreElements: (el) => {
          return (
            el.classList?.contains('no-print') ||
            el.classList?.contains('hover-action-bar') ||
            el.classList?.contains('gear-popup') ||
            el.classList?.contains('btn-new-section') ||
            el.closest?.('.no-print') !== null
          );
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resume.header?.name?.replace(/\s+/g, '_') || 'Resume'}_Enhancv.pdf`);
      showToast('PDF downloaded successfully!', 'success');
    } catch (err) {
      console.error('PDF Generation error:', err);
      // Fallback
      window.print();
    } finally {
      // Restore normal editing UI
      document.body.classList.remove('exporting-pdf');
      element.classList.remove('exporting-pdf');
    }
  };

  return (
    <div className="min-h-screen bg-[#eaedf2] text-slate-800 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        resume={resume}
        onResumeChange={setResume}
        onSave={handleSave}
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
        onReset={handleReset}
        isSaving={isSaving}
      />

      {/* Main Resume Canvas Workspace */}
      <main className="flex-1 overflow-y-auto py-6 sm:py-10">
        <div className="max-w-5xl mx-auto px-2 sm:px-4">
          <ResumeCanvas
            resume={resume}
            onResumeChange={setResume}
            printRef={printRef}
          />
        </div>
      </main>

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
