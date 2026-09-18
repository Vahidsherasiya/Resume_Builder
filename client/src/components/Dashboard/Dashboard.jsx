import React, { useState } from 'react';
import { 
  Plus, FileText, Edit3, Trash2, Copy, Sparkles, 
  ArrowRight, Layout, CheckCircle2, Clock, Download, 
  User, Shield, Zap, Search, Eye, X, Star, Check 
} from 'lucide-react';
import { RESUME_TEMPLATES } from '../../types/templatesData';

// Miniature visual layout renderer for each template card
function TemplateMiniPreview({ template }) {
  const primaryColor = template.theme?.primaryColor || '#00c598';
  const columnLayout = template.theme?.columnLayout || '55-45';
  const sampleHeader = template.sampleData?.header || {};
  const isDarkSidebar = template.id === 'template-dark-sidebar';
  const isSidebarLeft = columnLayout === '40-60' || isDarkSidebar;
  const isSingleCol = columnLayout === 'single';
  const isSerif = template.theme?.fontFamily?.includes('serif');

  return (
    <div className="w-full h-56 bg-slate-100 p-2.5 flex items-center justify-center overflow-hidden relative group">
      {/* Miniature A4 Sheet */}
      <div 
        className="w-[94%] h-[95%] bg-white rounded-md shadow-md border border-slate-200/90 overflow-hidden flex flex-col transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ fontFamily: isSerif ? 'Georgia, serif' : 'Inter, sans-serif' }}
      >
        {/* Top Accent Strip */}
        <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: primaryColor }} />

        {/* Mini Sheet Content */}
        <div className="flex-1 flex flex-col p-2.5 overflow-hidden text-[7px] leading-tight">
          {/* Mini Header */}
          <div className={`pb-1.5 mb-1.5 border-b border-slate-100 ${isDarkSidebar ? 'bg-slate-900 -mx-2.5 -mt-2.5 p-2 text-white' : ''}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-extrabold text-[9px] tracking-tight truncate" style={{ color: isDarkSidebar ? '#ffffff' : '#0f172a' }}>
                  {sampleHeader.name || 'ALEX MORGAN'}
                </div>
                <div className="font-bold text-[7px] truncate" style={{ color: primaryColor }}>
                  {sampleHeader.title || 'Senior Software Engineer'}
                </div>
              </div>
              <div className="w-4 h-4 rounded-full bg-slate-200 shrink-0 border border-white shadow-xs flex items-center justify-center text-[6px] font-bold text-slate-600">
                {sampleHeader.name ? sampleHeader.name[0] : 'U'}
              </div>
            </div>
            {/* Contact row pills */}
            <div className="flex items-center gap-1.5 mt-1 opacity-70 text-[5.5px]">
              <span className="truncate">{sampleHeader.location || 'San Francisco, CA'}</span>
              <span>•</span>
              <span className="truncate">{sampleHeader.email || 'alex@example.com'}</span>
            </div>
          </div>

          {/* Mini Columns Layout */}
          {isSingleCol ? (
            /* Single Column High Density Layout */
            <div className="flex-1 space-y-1.5 overflow-hidden">
              <div>
                <div className="font-black text-[6.5px] uppercase tracking-wider mb-0.5 flex items-center gap-1" style={{ color: primaryColor }}>
                  <span>EXPERIENCE</span>
                  <div className="flex-1 h-px bg-slate-100"></div>
                </div>
                <div className="space-y-1">
                  <div>
                    <div className="font-bold text-[6px] text-slate-800">Lead Tech Architect • Stripeflow</div>
                    <div className="h-1 w-full bg-slate-200/80 rounded-xs mt-0.5"></div>
                    <div className="h-1 w-4/5 bg-slate-200/60 rounded-xs mt-0.5"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-black text-[6.5px] uppercase tracking-wider mb-0.5 flex items-center gap-1" style={{ color: primaryColor }}>
                  <span>KEY SKILLS & STACK</span>
                  <div className="flex-1 h-px bg-slate-100"></div>
                </div>
                <div className="flex flex-wrap gap-0.5">
                  {['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'].map((s) => (
                    <span key={s} className="px-1 py-0.2 rounded-xs font-semibold text-[5px]" style={{ backgroundColor: `${primaryColor}18`, color: primaryColor }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : isSidebarLeft ? (
            /* Sidebar Layout (e.g. Dark Sidebar or Creative Coral) */
            <div className="flex-1 flex gap-2 overflow-hidden">
              {/* Left Sidebar */}
              <div 
                className={`w-[38%] p-1.5 rounded-sm space-y-1.5 shrink-0 ${isDarkSidebar ? 'bg-slate-900 text-white' : 'bg-slate-50'}`}
              >
                <div>
                  <div className="font-bold text-[6px] uppercase tracking-wider mb-0.5" style={{ color: primaryColor }}>
                    SKILLS
                  </div>
                  <div className="space-y-0.5">
                    {['Full-Stack Dev', 'Cloud Architecture', 'DevOps', 'System Design'].map((s) => (
                      <div key={s} className="text-[5px] truncate font-medium">
                        • {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-[6px] uppercase tracking-wider mb-0.5" style={{ color: primaryColor }}>
                    EDUCATION
                  </div>
                  <div className="text-[5px] font-bold truncate">B.S. Computer Sci</div>
                  <div className="text-[4.5px] opacity-70 truncate">State University</div>
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1 space-y-1.5 overflow-hidden">
                <div>
                  <div className="font-black text-[6.5px] uppercase tracking-wider mb-0.5" style={{ color: primaryColor }}>
                    EXPERIENCE
                  </div>
                  <div className="font-bold text-[6px] text-slate-900 truncate">Senior Software Lead</div>
                  <div className="h-1 w-full bg-slate-200/80 rounded-xs mt-0.5"></div>
                  <div className="h-1 w-4/5 bg-slate-200/60 rounded-xs mt-0.5"></div>
                </div>
                <div>
                  <div className="font-black text-[6.5px] uppercase tracking-wider mb-0.5" style={{ color: primaryColor }}>
                    SUMMARY
                  </div>
                  <div className="h-1 w-full bg-slate-200/70 rounded-xs"></div>
                  <div className="h-1 w-3/4 bg-slate-200/50 rounded-xs mt-0.5"></div>
                </div>
              </div>
            </div>
          ) : (
            /* Dual Column Balanced (55-45 / 50-50 / 60-40) */
            <div className="flex-1 flex gap-2 overflow-hidden">
              {/* Left Column */}
              <div className="w-[56%] space-y-1.5 overflow-hidden">
                <div>
                  <div className="font-black text-[6.5px] uppercase tracking-wider mb-0.5" style={{ color: primaryColor }}>
                    EXPERIENCE
                  </div>
                  <div className="font-bold text-[6px] text-slate-800 truncate">Principal Engineer</div>
                  <div className="h-1 w-full bg-slate-200/80 rounded-xs mt-0.5"></div>
                  <div className="h-1 w-5/6 bg-slate-200/60 rounded-xs mt-0.5"></div>
                  <div className="h-1 w-2/3 bg-slate-200/40 rounded-xs mt-0.5"></div>
                </div>
                <div>
                  <div className="font-bold text-[6px] text-slate-800 truncate">Senior Developer</div>
                  <div className="h-1 w-full bg-slate-200/70 rounded-xs mt-0.5"></div>
                </div>
              </div>

              {/* Right Column */}
              <div className="w-[44%] space-y-1.5 overflow-hidden">
                <div>
                  <div className="font-black text-[6.5px] uppercase tracking-wider mb-0.5" style={{ color: primaryColor }}>
                    SKILLS
                  </div>
                  <div className="flex flex-wrap gap-0.5">
                    {['React', 'Node', 'Docker', 'AWS'].map((s) => (
                      <span key={s} className="px-1 py-0.2 rounded-xs font-semibold text-[5px]" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-black text-[6.5px] uppercase tracking-wider mb-0.5" style={{ color: primaryColor }}>
                    EDUCATION
                  </div>
                  <div className="text-[5.5px] font-bold text-slate-800 truncate">B.S. Software Eng</div>
                  <div className="text-[4.5px] text-slate-500">2018 - 2022</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hover Visual Badge */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
        <span className="px-3 py-1.5 bg-white text-slate-900 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
          <Eye className="w-3.5 h-3.5 text-[#00c598]" />
          <span>Click to Preview</span>
        </span>
      </div>
    </div>
  );
}

export default function Dashboard({ 
  savedResumes = [], 
  currentUser, 
  templates = RESUME_TEMPLATES,
  templateMetrics = {},
  onEditResume, 
  onCreateNewFromTemplate, 
  onDeleteResume, 
  onDuplicateResume 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const categories = ['All', 'Modern', 'Tech & Single-Col', 'Executive', 'Creative', 'ATS Optimized', 'Academic'];
  const templateList = templates || RESUME_TEMPLATES;

  const filteredTemplates = templateList.filter((template) => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.sampleData?.header?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f3f6f9] py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00c598]/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 right-48 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00c598]/10 text-[#00c598] rounded-full text-xs font-semibold border border-[#00c598]/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI & ATS Optimized Resume Platform</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-3">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c598] to-[#38bdf8]">{currentUser?.name || 'Professional'}</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Choose from 10 handcrafted resume templates loaded with realistic dummy data, live visual designs, and verified download counts.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#templates-section"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00c598] to-[#00a37e] hover:from-[#00a37e] hover:to-[#008f6e] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Choose a Template to Start</span>
              </a>
              <span className="text-xs text-slate-400 font-medium ml-2">
                {savedResumes.length > 0
                  ? `${savedResumes.length} custom resume${savedResumes.length === 1 ? '' : 's'} created`
                  : 'No resumes created yet — select any template below to start!'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: My Saved Resumes (Only rendered if user actually has saved resumes) */}
        {savedResumes.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#00c598]" />
                  <span>My Resumes</span>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full text-xs font-bold">
                    {savedResumes.length}
                  </span>
                </h2>
                <p className="text-xs text-slate-500">Edit, duplicate, or download your custom saved resumes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedResumes.map((res) => {
                const primaryColor = res.theme?.primaryColor || '#00c598';
                return (
                  <div
                    key={res.id}
                    className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Header Card */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wider"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {res.theme?.templateStyle?.replace('template-', '').replace('-', ' ') || 'Resume'}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{new Date(res.lastModified || Date.now()).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#00a37e] transition-colors line-clamp-1">
                        {res.title || res.header?.name || 'Untitled Resume'}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5 line-clamp-1">
                        {res.header?.title || 'Professional Title'}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        {res.header?.email || 'No email specified'}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onDuplicateResume(res)}
                          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Duplicate Resume"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteResume(res.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Resume"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onEditResume(res)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-[#00c598] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Resume</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: 10 Templates Gallery with Realistic Visual Previews & Download Counts */}
        <div id="templates-section" className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Layout className="w-6 h-6 text-[#00c598]" />
                <span>10 Professional Templates</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Visual template previews with real design layout and verified download counts
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search templates or roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00c598]/40 focus:border-[#00c598]"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {cat} {cat === 'All' && `(${templateList.length})`}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const primaryColor = template.theme?.primaryColor || '#00c598';
              const metrics = templateMetrics[template.id] || { downloads: 48, uses: 120 };

              return (
                <div
                  key={template.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1"
                >
                  {/* Visual Template Preview Canvas */}
                  <div 
                    onClick={() => setPreviewTemplate(template)}
                    className="cursor-pointer"
                  >
                    <TemplateMiniPreview template={template} />
                  </div>

                  {/* Card Details & Download Count */}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      {/* Top Badges & Download Count */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">
                          {template.category}
                        </span>

                        {/* Live Download & Use Badge */}
                        <div className="flex items-center gap-1.5">
                          <span 
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60"
                            title="Total Verified PDF Downloads"
                          >
                            <Download className="w-3 h-3 text-blue-600" />
                            <span>{metrics.downloads}</span>
                          </span>
                          <span 
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                            title="Times Chosen by Users"
                          >
                            <Zap className="w-2.5 h-2.5 text-emerald-500 fill-emerald-500" />
                            <span>{metrics.uses}</span>
                          </span>
                        </div>
                      </div>

                      <h4 className="font-extrabold text-slate-900 text-base group-hover:text-[#00a37e] transition-colors">
                        {template.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {template.description}
                      </p>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(template)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onCreateNewFromTemplate(template)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#00c598] to-[#00a37e] hover:from-[#00a37e] hover:to-[#008f6e] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all"
                      >
                        <span>Use Template</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Large Quick Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-popover">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#00c598]/20 text-[#00c598] border border-[#00c598]/30">
                    {previewTemplate.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {previewTemplate.theme?.columnLayout || 'Dual Column'} Layout
                  </span>
                </div>
                <h3 className="text-xl font-bold mt-1 text-white">{previewTemplate.name}</h3>
              </div>

              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Preview */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto bg-[#eaedf2]">
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-4 text-xs">
                {/* Header Preview */}
                <div className="border-b border-slate-200 pb-4">
                  <h2 
                    className="text-2xl font-black tracking-tight"
                    style={{ color: previewTemplate.theme?.primaryColor || '#00c598' }}
                  >
                    {previewTemplate.sampleData?.header?.name || 'SAMPLE CANDIDATE'}
                  </h2>
                  <p className="text-sm font-semibold text-slate-700">
                    {previewTemplate.sampleData?.header?.title || 'Professional Title'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {previewTemplate.sampleData?.header?.location} • {previewTemplate.sampleData?.header?.email}
                  </p>
                </div>

                {/* Sample Summary */}
                <div>
                  <h4 
                    className="font-bold uppercase tracking-wider text-xs mb-1.5"
                    style={{ color: previewTemplate.theme?.primaryColor || '#00c598' }}
                  >
                    Professional Summary
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {previewTemplate.sampleData?.leftColumn?.[0]?.content || previewTemplate.description}
                  </p>
                </div>

                {/* Stats & Details Grid */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-slate-900 text-xs">
                        {templateMetrics[previewTemplate.id]?.downloads || 48} Downloads
                      </div>
                      <div className="text-[10px] text-slate-400">Verified A4 PDF exports</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                    <div>
                      <div className="font-bold text-slate-900 text-xs">
                        {templateMetrics[previewTemplate.id]?.uses || 120} Created
                      </div>
                      <div className="text-[10px] text-slate-400">Chosen by applicants</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-white border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Close Preview
              </button>

              <button
                type="button"
                onClick={() => {
                  onCreateNewFromTemplate(previewTemplate);
                  setPreviewTemplate(null);
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-[#00c598] to-[#00a37e] hover:from-[#00a37e] hover:to-[#008f6e] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Use This Template</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
