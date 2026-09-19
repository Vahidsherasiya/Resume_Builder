import React, { useState, useEffect } from 'react';
import { 
  Users, Shield, Layout, Plus, Trash2, CheckCircle2, 
  Upload, FileText, Palette, Type, Sparkles, AlertCircle, 
  Search, ShieldAlert, ArrowRight, Eye, RefreshCw 
} from 'lucide-react';
import { api } from '../../services/api';
import AutoResumeLogo from '../UI/AutoResumeLogo';

export default function AdminPanel({ 
  currentUser, 
  templates, 
  onAddNewTemplate, 
  onDeleteCustomTemplate 
}) {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userSearch, setUserSearch] = useState('');
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'new-template' | 'templates'
  const [statusMsg, setStatusMsg] = useState(null);

  // New Template Form State
  const [tplName, setTplName] = useState('');
  const [tplCategory, setTplCategory] = useState('Modern');
  const [tplBadge, setTplBadge] = useState('New Design');
  const [tplColor, setTplColor] = useState('#0284c7');
  const [tplFont, setTplFont] = useState('Inter, sans-serif');
  const [tplLayout, setTplLayout] = useState('55-45');
  const [tplDesc, setTplDesc] = useState('Modern professional resume layout with high visual hierarchy.');
  const [sampleRole, setSampleRole] = useState('Principal Software Architect');
  const [sampleName, setSampleName] = useState('Jonathan Reynolds');
  const [sampleSummary, setSampleSummary] = useState('High impact engineer with 8+ years leading scalable platforms and enterprise cloud architecture.');

  const showNotification = (msg, type = 'success') => {
    setStatusMsg({ msg, type });
    setTimeout(() => setStatusMsg(null), 3500);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const data = await api.getUsers();
      setUsers(Array.isArray(data) ? data : []);
      localStorage.setItem('admin_users_list', JSON.stringify(data));
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId || u._id === userId ? { ...u, role: newRole } : u))
      );
      showNotification(`User role updated to ${newRole.toUpperCase()}!`, 'success');
    } catch (err) {
      showNotification('Failed to update role', 'error');
    }
  };

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    if (!tplName.trim()) {
      showNotification('Please enter a template name', 'error');
      return;
    }

    const templateId = `tpl-custom-${Date.now()}`;
    const newTemplate = {
      id: templateId,
      name: tplName,
      category: tplCategory,
      badge: tplBadge || 'Custom',
      description: tplDesc,
      isCustom: true,
      theme: {
        templateStyle: 'custom-modern',
        primaryColor: tplColor,
        secondaryColor: '#1e293b',
        accentColor: tplColor,
        fontFamily: tplFont,
        fontSize: 'medium',
        lineSpacing: 'normal',
        columnLayout: tplLayout,
        borderStyle: 'solid'
      },
      sampleData: {
        id: `resume-${templateId}`,
        title: `${tplName} Resume`,
        lastModified: new Date().toISOString(),
        theme: {
          templateStyle: 'custom-modern',
          primaryColor: tplColor,
          secondaryColor: '#1e293b',
          accentColor: tplColor,
          fontFamily: tplFont,
          fontSize: 'medium',
          lineSpacing: 'normal',
          columnLayout: tplLayout,
          borderStyle: 'solid'
        },
        header: {
          name: sampleName.toUpperCase(),
          title: sampleRole,
          phone: '+1 (555) 019-4820',
          email: `${sampleName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          link: `linkedin.com/in/${sampleName.toLowerCase().replace(/\s+/g, '-')}`,
          extraLink: 'github.com/profile',
          location: 'New York, NY',
          settings: {
            showTitle: true,
            showPhone: true,
            showLink: true,
            showExtraLink: true,
            showEmail: true,
            showLocation: true,
            isUppercaseName: true,
            showPhoto: false
          }
        },
        leftColumn: [
          {
            id: 'sec-sum',
            type: 'summary',
            title: 'PROFESSIONAL SUMMARY',
            content: sampleSummary,
            settings: { fontSize: 'normal', isBullet: false }
          },
          {
            id: 'sec-exp',
            type: 'experience',
            title: 'EXPERIENCE',
            items: [
              {
                id: 'exp-1',
                role: sampleRole,
                company: 'Apex Global Enterprises',
                dateRange: '2021 - Present',
                bullets: [
                  'Spearheaded enterprise digital engineering initiatives resulting in 40% performance gains.',
                  'Delivered high-availability microservices architecture handling 100k requests/sec.'
                ]
              }
            ]
          }
        ],
        rightColumn: [
          {
            id: 'sec-skills',
            type: 'skills',
            title: 'CORE COMPETENCIES',
            settings: { showGroupName: false, layout: 'tags', borderStyle: 'solid' },
            groups: [
              {
                id: 'grp-1',
                name: 'Skills',
                skills: ['Strategic Planning', 'System Design', 'Cloud Architecture', 'React.js', 'Node.js', 'CI/CD Pipelines']
              }
            ]
          },
          {
            id: 'sec-edu',
            type: 'education',
            title: 'EDUCATION',
            settings: { showGpa: true, showInstitution: true, showLocation: true, showDatePeriod: true },
            items: [
              {
                id: 'edu-1',
                degree: 'B.S. in Computer Science',
                institution: 'State University of New York',
                dateRange: '2015 - 2019',
                location: 'New York, NY',
                gpa: '3.9'
              }
            ]
          }
        ]
      }
    };

    onAddNewTemplate(newTemplate);
    showNotification(`New template "${tplName}" successfully published to all users!`, 'success');
    
    // Reset Form
    setTplName('');
    setActiveTab('templates');
  };

  const filteredUsers = users.filter((u) => {
    return (
      (u.name && u.name.toLowerCase().includes(userSearch.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(userSearch.toLowerCase())) ||
      (u.role && u.role.toLowerCase().includes(userSearch.toLowerCase()))
    );
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f3f6f9] py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00c598]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <div className="mb-3">
              <AutoResumeLogo size="sm" theme="light-text" badge="Admin Center" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Control Panel & Template Publisher
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Manage all registered users, assign roles, and upload new design templates for users.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadUsers}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="Refresh Users"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMsg && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 animate-popover ${
              statusMsg.type === 'error'
                ? 'bg-rose-50 border border-rose-200 text-rose-600'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
            }`}
          >
            {statusMsg.type === 'error' ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMsg.msg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'users'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4 text-[#00c598]" />
            <span>Registered Users ({users.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('new-template')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'new-template'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Plus className="w-4 h-4 text-[#00c598]" />
            <span>Upload Template</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'templates'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layout className="w-4 h-4 text-[#00c598]" />
            <span>Published Templates ({templates.length})</span>
          </button>
        </div>

        {/* Tab 1: All Users & Role Change */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">User Management</h3>
                <p className="text-xs text-slate-500">
                  View users who logged in or registered and toggle their roles between User and Admin.
                </p>
              </div>

              {/* User Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search user name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c598]/50"
                />
              </div>
            </div>

            {/* Mobile User Card List */}
            <div className="block md:hidden space-y-3">
              {filteredUsers.map((u) => {
                const isAdmin = u.role === 'admin';
                return (
                  <div key={u.id || u._id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                          {u.name ? u.name[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900">{u.name || 'Anonymous User'}</div>
                          <div className="text-[11px] text-slate-500">{u.email}</div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isAdmin
                            ? 'bg-purple-100 text-purple-700 border border-purple-300'
                            : 'bg-slate-200/80 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {isAdmin && <Shield className="w-3 h-3 text-purple-600" />}
                        <span>{u.role ? u.role.toUpperCase() : 'USER'}</span>
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRoleChange(u.id || u._id, isAdmin ? 'user' : 'admin')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          isAdmin
                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                        }`}
                      >
                        {isAdmin ? 'Demote to User' : 'Promote to Admin'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Registered</th>
                    <th className="py-3 px-4 text-right">Change Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {filteredUsers.map((u) => {
                    const isAdmin = u.role === 'admin';
                    return (
                      <tr key={u.id || u._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                            {u.name ? u.name[0].toUpperCase() : 'U'}
                          </div>
                          <span>{u.name || 'Anonymous User'}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{u.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isAdmin
                                ? 'bg-purple-100 text-purple-700 border border-purple-300'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {isAdmin && <Shield className="w-3 h-3 text-purple-600" />}
                            <span>{u.role ? u.role.toUpperCase() : 'USER'}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px]">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleRoleChange(u.id || u._id, isAdmin ? 'user' : 'admin')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              isAdmin
                                ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                                : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                            }`}
                          >
                            {isAdmin ? 'Demote to User' : 'Promote to Admin'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Upload / Add New Design Template */}
        {activeTab === 'new-template' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Upload / Create New Design Template
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Configure a new resume design spec. Once published, it immediately appears on the user side for all users.
              </p>
            </div>

            <form onSubmit={handleCreateTemplate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Template Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Executive Royal Navy"
                    value={tplName}
                    onChange={(e) => setTplName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c598]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={tplCategory}
                    onChange={(e) => setTplCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c598]/50"
                  >
                    <option value="Modern">Modern</option>
                    <option value="Tech & Single-Col">Tech & Single-Col</option>
                    <option value="Executive">Executive</option>
                    <option value="Creative">Creative</option>
                    <option value="ATS Optimized">ATS Optimized</option>
                    <option value="Academic">Academic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={tplColor}
                      onChange={(e) => setTplColor(e.target.value)}
                      className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={tplColor}
                      onChange={(e) => setTplColor(e.target.value)}
                      className="w-32 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Column Layout Style
                  </label>
                  <select
                    value={tplLayout}
                    onChange={(e) => setTplLayout(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c598]/50"
                  >
                    <option value="55-45">55 / 45 Split Dual Column</option>
                    <option value="50-50">50 / 50 Equal Split</option>
                    <option value="60-40">60 / 40 Wide Left</option>
                    <option value="40-60">40 / 60 Wide Right (Sidebar)</option>
                    <option value="single">Single Column High Density</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Typography Font Family
                  </label>
                  <select
                    value={tplFont}
                    onChange={(e) => setTplFont(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c598]/50"
                  >
                    <option value="Inter, sans-serif">Inter (Clean Modern)</option>
                    <option value="Outfit, sans-serif">Outfit (Geometric Soft)</option>
                    <option value="Poppins, sans-serif">Poppins (Modern Bold)</option>
                    <option value="Roboto, sans-serif">Roboto (Standard Tech)</option>
                    <option value="Merriweather, serif">Merriweather (Classic Serif)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Featured / New / Pro"
                    value={tplBadge}
                    onChange={(e) => setTplBadge(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c598]/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Template Description
                </label>
                <textarea
                  rows={2}
                  value={tplDesc}
                  onChange={(e) => setTplDesc(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c598]/50"
                />
              </div>

              {/* Sample Dummy Data Spec */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider block">
                  Sample Dummy Data for Users
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Dummy Candidate Name</label>
                    <input
                      type="text"
                      value={sampleName}
                      onChange={(e) => setSampleName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Dummy Job Title</label>
                    <input
                      type="text"
                      value={sampleRole}
                      onChange={(e) => setSampleRole(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#00c598] to-[#00a37e] hover:from-[#00a37e] hover:to-[#008f6e] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish New Template to User Gallery</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: All Published Templates */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((tpl) => {
              const primaryColor = tpl.theme?.primaryColor || '#00c598';
              return (
                <div
                  key={tpl.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                        {tpl.category}
                      </span>
                      {tpl.isCustom && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                          Admin Added
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{tpl.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{tpl.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: primaryColor }}
                      />
                      <span className="text-[10px] text-slate-400 font-mono">{primaryColor}</span>
                    </div>

                    {tpl.isCustom && (
                      <button
                        type="button"
                        onClick={() => onDeleteCustomTemplate(tpl.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Template"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
