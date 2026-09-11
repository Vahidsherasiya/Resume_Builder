import React, { useEffect, useRef } from 'react';
import { 
  X, ArrowUp, ArrowDown, ArrowLeftRight, Trash2, 
  GripVertical, FileText, GraduationCap, Briefcase, 
  Code2, Heart, Lightbulb, Languages, FolderKanban, 
  Award, PlusCircle 
} from 'lucide-react';

const ICONS_MAP = {
  summary: FileText,
  education: GraduationCap,
  experience: Briefcase,
  skills: Code2,
  strengths: Heart,
  interests: Lightbulb,
  languages: Languages,
  projects: FolderKanban,
  certifications: Award,
  custom: PlusCircle
};

export default function RearrangeSectionsModal({ resume, onResumeChange, onClose }) {
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

  const leftList = resume.leftColumn || [];
  const rightList = resume.rightColumn || [];

  const moveItem = (fromCol, index, direction) => {
    const colKey = fromCol === 'left' ? 'leftColumn' : 'rightColumn';
    const list = [...(resume[colKey] || [])];
    const targetIdx = index + direction;

    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    onResumeChange({
      ...resume,
      [colKey]: list
    });
  };

  const switchColumn = (fromCol, index) => {
    const sourceKey = fromCol === 'left' ? 'leftColumn' : 'rightColumn';
    const targetKey = fromCol === 'left' ? 'rightColumn' : 'leftColumn';

    const sourceList = [...(resume[sourceKey] || [])];
    const targetList = [...(resume[targetKey] || [])];

    const [item] = sourceList.splice(index, 1);
    targetList.push(item);

    onResumeChange({
      ...resume,
      [sourceKey]: sourceList,
      [targetKey]: targetList
    });
  };

  const deleteSection = (fromCol, index) => {
    const colKey = fromCol === 'left' ? 'leftColumn' : 'rightColumn';
    const list = (resume[colKey] || []).filter((_, i) => i !== index);

    onResumeChange({
      ...resume,
      [colKey]: list
    });
  };

  const renderSectionCard = (sec, idx, col) => {
    const Icon = ICONS_MAP[sec.type] || FileText;
    const isFirst = idx === 0;
    const isLast = idx === (col === 'left' ? leftList.length - 1 : rightList.length - 1);

    return (
      <div
        key={sec.id || idx}
        className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-[#00c598] transition-all group"
      >
        <div className="flex items-center gap-3">
          <GripVertical className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
          <div className="p-2 rounded-lg bg-[#e6faf5] text-[#00a37e]">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              {sec.title || sec.type}
            </h4>
            <span className="text-[10px] text-slate-400 capitalize">
              {sec.type} section
            </span>
          </div>
        </div>

        {/* Action Buttons: Up, Down, Switch Col, Delete */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => moveItem(col, idx, -1)}
            title="Move Up"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={() => moveItem(col, idx, 1)}
            title="Move Down"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => switchColumn(col, idx)}
            title={`Move to ${col === 'left' ? 'Right' : 'Left'} Column`}
            className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => deleteSection(col, idx)}
            title="Delete Section"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-[#f8fafc] rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-popover"
      >
        <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Rearrange Sections
            </h3>
            <p className="text-xs text-slate-500">
              Reorder or move sections between Left & Right columns
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
          {/* Left Column Sections */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <span className="text-xs font-black tracking-wider uppercase text-slate-700">
                Left Column ({leftList.length})
              </span>
            </div>
            <div className="space-y-2">
              {leftList.length === 0 ? (
                <div className="p-4 text-center border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                  No sections in left column
                </div>
              ) : (
                leftList.map((sec, idx) => renderSectionCard(sec, idx, 'left'))
              )}
            </div>
          </div>

          {/* Right Column Sections */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <span className="text-xs font-black tracking-wider uppercase text-slate-700">
                Right Column ({rightList.length})
              </span>
            </div>
            <div className="space-y-2">
              {rightList.length === 0 ? (
                <div className="p-4 text-center border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400">
                  No sections in right column
                </div>
              ) : (
                rightList.map((sec, idx) => renderSectionCard(sec, idx, 'right'))
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#00c598] hover:bg-[#00a37e] rounded-xl shadow-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
