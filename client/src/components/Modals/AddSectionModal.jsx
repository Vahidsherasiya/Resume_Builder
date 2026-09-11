import React, { useEffect, useRef } from 'react';
import { 
  X, Briefcase, GraduationCap, Code2, Award, 
  Languages, Heart, Lightbulb, FolderKanban, FileText, PlusCircle 
} from 'lucide-react';

export default function AddSectionModal({ onAddSection, onClose, column = 'left' }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const availableSections = [
    {
      id: 'summary',
      name: 'Summary',
      description: 'Professional introduction or career objective',
      icon: FileText
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Degrees, schools, GPA, and academic background',
      icon: GraduationCap
    },
    {
      id: 'experience',
      name: 'Work Experience',
      description: 'Jobs, internships, and professional roles',
      icon: Briefcase
    },
    {
      id: 'skills',
      name: 'Skills',
      description: 'Technical, domain, and tool proficiencies',
      icon: Code2
    },
    {
      id: 'strengths',
      name: 'Strengths',
      description: 'Key competencies and standout soft skills',
      icon: Heart
    },
    {
      id: 'interests',
      name: 'Interests',
      description: 'Hobbies, extracurriculars, reading, sports',
      icon: Lightbulb
    },
    {
      id: 'languages',
      name: 'Languages',
      description: 'Languages spoken and fluency levels',
      icon: Languages
    },
    {
      id: 'projects',
      name: 'Projects',
      description: 'Personal, freelance, or academic coding projects',
      icon: FolderKanban
    },
    {
      id: 'certifications',
      name: 'Certifications',
      description: 'Licenses, courses, and credentials',
      icon: Award
    },
    {
      id: 'custom',
      name: 'Custom Section',
      description: 'Add your own section with customized items',
      icon: PlusCircle
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-popover"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">
            Add New Section <span className="text-xs font-normal text-slate-500">({column === 'left' ? 'Left' : 'Right'} Column)</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  onAddSection(sec.id, column);
                  onClose();
                }}
                className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 hover:border-[#00c598] hover:bg-[#00c598]/5 transition-all text-left group"
              >
                <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-[#00c598] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 group-hover:text-[#00c598] transition-colors">
                    {sec.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                    {sec.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
