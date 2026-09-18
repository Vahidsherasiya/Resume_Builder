import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Layout, Eye, ArrowRight, 
  Layers, Palette, FileText, CheckCircle2 
} from 'lucide-react';
import { RESUME_TEMPLATES } from '../../types/templatesData';

export default function TemplateSelectorModal({ currentTemplateId, templates = RESUME_TEMPLATES, onSelectTemplate, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedId, setSelectedId] = useState(currentTemplateId || 'template-modern-enhancv');

  const categories = ['All', 'Modern', 'Tech & Single-Col', 'Executive', 'Creative', 'ATS Optimized', 'Academic'];

  const templateList = templates || RESUME_TEMPLATES;

  const filteredTemplates = selectedCategory === 'All'
    ? templateList
    : templateList.filter((t) => t.category === selectedCategory);

  const handleApply = (template) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-popover">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#e6faf5] text-[#00c598] flex items-center justify-center font-bold">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Resume Templates
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#00c598]/10 text-[#00a37e] font-semibold">
                  10 Professional Designs
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Choose any template to instantly populate with realistic dummy data & matching typography
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center gap-2 overflow-x-auto bg-white shrink-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat} {cat === 'All' && `(${templateList.length})`}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((template) => {
            const isSelected = selectedId === template.id;
            const primaryColor = template.theme.primaryColor || '#00c598';
            const sampleHeader = template.sampleData.header || {};

            return (
              <div
                key={template.id}
                onClick={() => setSelectedId(template.id)}
                className={`relative group rounded-xl border-2 transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-lg ${
                  isSelected
                    ? 'border-[#00c598] bg-[#f0fdf9] ring-2 ring-[#00c598]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {/* Visual Mini Mockup */}
                <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex flex-col justify-between h-44 relative overflow-hidden">
                  {/* Subtle color bar at top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: primaryColor }}
                  />

                  {/* Header Mockup */}
                  <div className="mt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {template.category}
                      </span>
                      {template.badge && (
                        <span
                          className="text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {template.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 truncate">
                      {sampleHeader.name || 'John Doe'}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-500 truncate" style={{ color: primaryColor }}>
                      {sampleHeader.title || 'Professional Title'}
                    </p>
                  </div>

                  {/* Body Mini Skeleton */}
                  <div className="space-y-1.5 my-2">
                    <div className="h-2 w-full bg-slate-200 rounded-sm"></div>
                    <div className="h-2 w-5/6 bg-slate-200/80 rounded-sm"></div>
                    <div className="h-2 w-4/6 bg-slate-200/60 rounded-sm"></div>
                  </div>

                  {/* Mini Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono">
                      {template.theme.columnLayout || '2-Column'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                      {template.theme.fontFamily?.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Info & Select Footer */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs flex items-center justify-between">
                      <span>{template.name}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00c598]" />}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <span className="text-[10px] text-slate-400 font-mono">
                        {primaryColor}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply(template);
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-[#00c598] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>Use Template</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Tip:</span> Applying a template loads matching layout settings and dummy data. You can edit any text in real-time.
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                const target = RESUME_TEMPLATES.find((t) => t.id === selectedId) || RESUME_TEMPLATES[0];
                handleApply(target);
              }}
              className="px-5 py-2 bg-[#00c598] hover:bg-[#00a37e] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Load Selected Template</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
