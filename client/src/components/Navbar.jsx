import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Download, Printer, Save, RefreshCw, Palette, 
  Type, LayoutGrid, Check, Sparkles, Cloud, Share2, 
  ArrowUpDown, SlidersHorizontal, Layout, User as UserIcon, LogOut, Shield 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import RearrangeSectionsModal from './Modals/RearrangeSectionsModal';
import TemplateSelectorModal from './Modals/TemplateSelectorModal';

import AutoResumeLogo from './UI/AutoResumeLogo';

const THEME_COLORS = [
  { name: 'AutoResume Teal', value: '#00c598' },
  { name: 'Ocean Blue', value: '#0284c7' },
  { name: 'Royal Indigo', value: '#4f46e5' },
  { name: 'Emerald Green', value: '#059669' },
  { name: 'Rose Red', value: '#e11d48' },
  { name: 'Charcoal Slate', value: '#334155' },
  { name: 'Purple Accent', value: '#9333ea' }
];

const FONTS = [
  { name: 'Inter (Clean)', value: 'Inter, sans-serif' },
  { name: 'Outfit (Modern)', value: 'Outfit, sans-serif' },
  { name: 'Poppins (Geometric)', value: 'Poppins, sans-serif' },
  { name: 'Roboto (Standard)', value: 'Roboto, sans-serif' },
  { name: 'Merriweather (Serif)', value: 'Merriweather, serif' }
];

const LAYOUTS = [
  { label: '55 / 45 Split', value: '55-45' },
  { label: '50 / 50 Equal', value: '50-50' },
  { label: '60 / 40 Wide Left', value: '60-40' },
  { label: '40 / 60 Wide Right', value: '40-60' },
  { label: 'Single Column', value: 'single' }
];

export default function Navbar({
  resume,
  onResumeChange,
  onSave,
  onDownloadPdf,
  onPrint,
  onReset,
  onSelectTemplate,
  currentUser,
  onLogout,
  currentView,
  onNavigateView,
  templates,
  isSaving,
  saveStatus
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);
  const [showRearrangeModal, setShowRearrangeModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const theme = resume?.theme || {};

  const updateTheme = (updates) => {
    onResumeChange({
      ...resume,
      theme: {
        ...theme,
        ...updates
      }
    });
  };

  const handleTemplatesClick = () => {
    if (currentView !== 'dashboard') {
      onNavigateView('dashboard');
    }
    setTimeout(() => {
      const el = document.getElementById('templates-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleConfettiAndDownload = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.2 }
    });
    onDownloadPdf();
  };

  const renderMobileSheets = () => {
    if (typeof document === 'undefined') return null;

    return createPortal(
      <>
        {/* Mobile Color Picker Sheet */}
        {showColorPicker && (
          <div
            className="md:hidden fixed inset-0 z-[9999] bg-slate-950/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 animate-popover"
            onClick={() => setShowColorPicker(false)}
          >
            <div
              className="w-full max-w-sm bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#00c598]" />
                  <span className="text-sm font-bold text-slate-800">Accent Color</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowColorPicker(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-700 p-1"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {THEME_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => {
                      updateTheme({ primaryColor: c.value });
                      setShowColorPicker(false);
                    }}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      theme.primaryColor === c.value
                        ? 'border-[#00c598] bg-[#e6faf5] text-[#00a37e]'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full ring-1 ring-black/10 shrink-0" style={{ backgroundColor: c.value }} />
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Font Picker Sheet */}
        {showFontPicker && (
          <div
            className="md:hidden fixed inset-0 z-[9999] bg-slate-950/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 animate-popover"
            onClick={() => setShowFontPicker(false)}
          >
            <div
              className="w-full max-w-sm bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-[#00c598]" />
                  <span className="text-sm font-bold text-slate-800">Choose Typography</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFontPicker(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-700 p-1"
                >
                  Close
                </button>
              </div>
              <div className="space-y-1.5">
                {FONTS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => {
                      updateTheme({ fontFamily: f.value });
                      setShowFontPicker(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      theme.fontFamily === f.value
                        ? 'border-[#00c598] bg-[#e6faf5] text-[#00a37e]'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span style={{ fontFamily: f.value }}>{f.name}</span>
                    {theme.fontFamily === f.value && <Check className="w-4 h-4 text-[#00c598]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Layout Picker Sheet */}
        {showLayoutPicker && (
          <div
            className="md:hidden fixed inset-0 z-[9999] bg-slate-950/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 animate-popover"
            onClick={() => setShowLayoutPicker(false)}
          >
            <div
              className="w-full max-w-sm bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-[#00c598]" />
                  <span className="text-sm font-bold text-slate-800">Column Layout</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLayoutPicker(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-700 p-1"
                >
                  Close
                </button>
              </div>
              <div className="space-y-1.5">
                {LAYOUTS.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => {
                      updateTheme({ columnLayout: l.value });
                      setShowLayoutPicker(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      theme.columnLayout === l.value
                        ? 'border-[#00c598] bg-[#e6faf5] text-[#00a37e]'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{l.label}</span>
                    {theme.columnLayout === l.value && <Check className="w-4 h-4 text-[#00c598]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </>,
      document.body
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Logo & Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <AutoResumeLogo 
            onClick={() => onNavigateView('dashboard')} 
            badge="A4 Builder"
            size="sm"
          />

          {/* Navigation: Dashboard Button (Desktop only, or in Editor mobile) */}
          <button
            type="button"
            onClick={() => onNavigateView('dashboard')}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentView === 'dashboard'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#00c598]" />
            <span>Dashboard</span>
          </button>

          {/* Navigation: Templates Button (Desktop only) */}
          <button
            type="button"
            onClick={handleTemplatesClick}
            className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all duration-150"
            title="Browse 10 Professional Resume Templates"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Templates</span>
            <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px] font-mono">10</span>
          </button>
        </div>

        {/* Center: Customization Controls (Shown on Desktop in Editor View) */}
        {currentView === 'editor' && (
          <div className="hidden md:flex items-center gap-1.5">
            {/* Rearrange Sections Button */}
            <button
              type="button"
              onClick={() => setShowRearrangeModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Rearrange Sections"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#00c598]" />
              <span>Rearrange</span>
            </button>

            {/* Color Picker Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowColorPicker(!showColorPicker);
                  setShowFontPicker(false);
                  setShowLayoutPicker(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <div
                  className="w-3.5 h-3.5 rounded-full ring-1 ring-black/10"
                  style={{ backgroundColor: theme.primaryColor || '#00c598' }}
                />
                <span>Color</span>
              </button>

              {showColorPicker && (
                <div className="absolute top-11 left-0 z-50 w-52 bg-white rounded-xl shadow-xl border border-slate-200 p-3 animate-popover">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Accent Color
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {THEME_COLORS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => {
                          updateTheme({ primaryColor: c.value });
                          setShowColorPicker(false);
                        }}
                        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 text-xs font-medium text-slate-700"
                      >
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: c.value }} />
                        <span className="truncate">{c.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Font Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowFontPicker(!showFontPicker);
                  setShowColorPicker(false);
                  setShowLayoutPicker(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <Type className="w-3.5 h-3.5 text-slate-500" />
                <span>Font</span>
              </button>

              {showFontPicker && (
                <div className="absolute top-11 left-0 z-50 w-48 bg-white rounded-xl shadow-xl border border-slate-200 p-2 animate-popover">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block px-2 py-1">
                    Typography
                  </span>
                  <div className="space-y-1">
                    {FONTS.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => {
                          updateTheme({ fontFamily: f.value });
                          setShowFontPicker(false);
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-xs font-medium text-slate-700 text-left"
                      >
                        <span>{f.name}</span>
                        {theme.fontFamily === f.value && <Check className="w-3.5 h-3.5 text-[#00c598]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Layout Split Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowLayoutPicker(!showLayoutPicker);
                  setShowColorPicker(false);
                  setShowFontPicker(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-slate-500" />
                <span>Layout</span>
              </button>

              {showLayoutPicker && (
                <div className="absolute top-11 left-0 z-50 w-48 bg-white rounded-xl shadow-xl border border-slate-200 p-2 animate-popover">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block px-2 py-1">
                    Column Structure
                  </span>
                  <div className="space-y-1">
                    {LAYOUTS.map((l) => (
                      <button
                        key={l.value}
                        onClick={() => {
                          updateTheme({ columnLayout: l.value });
                          setShowLayoutPicker(false);
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-xs font-medium text-slate-700 text-left"
                      >
                        <span>{l.label}</span>
                        {theme.columnLayout === l.value && <Check className="w-3.5 h-3.5 text-[#00c598]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Admin Portal Tab (Shown ONLY for Admins) */}
          {currentUser?.role === 'admin' && (
            <button
              type="button"
              onClick={() => onNavigateView(currentView === 'admin' ? 'dashboard' : 'admin')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentView === 'admin'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
              }`}
              title="Admin Panel: Manage Users & Upload Templates"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          )}

          {/* Editor Action Buttons (Shown ONLY in Editor View) */}
          {currentView === 'editor' && (
            <>
              {/* Save to MERN Backend (Desktop only, mobile in sub-toolbar) */}
              <button
                type="button"
                onClick={onSave}
                disabled={isSaving}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                title="Save to MongoDB"
              >
                <Cloud className="w-4 h-4 text-[#00c598]" />
                <span>
                  {isSaving ? 'Saving...' : saveStatus || 'Save'}
                </span>
              </button>

              {/* Reset Template (Desktop only) */}
              <button
                type="button"
                onClick={onReset}
                className="hidden sm:inline-flex p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                title="Reset with Dummy Data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Print A4 - SHOWN ONLY FOR ADMINS */}
              {currentUser?.role === 'admin' && (
                <button
                  type="button"
                  onClick={onPrint}
                  className="hidden sm:inline-flex p-2 text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors"
                  title="Print A4 (Admin Feature)"
                >
                  <Printer className="w-4 h-4" />
                </button>
              )}

              {/* Download PDF (A4 Export) */}
              <button
                type="button"
                onClick={handleConfettiAndDownload}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#00c598] to-[#00a37e] hover:from-[#00a37e] hover:to-[#008f6e] rounded-lg shadow-sm hover:shadow transition-all"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </>
          )}

          {/* User Account / Logout Menu */}
          {currentUser && (
            <div className="relative ml-0.5">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-[#00c598]/40 transition-all"
                title={`Logged in as ${currentUser.name || currentUser.email} (${currentUser.role || 'user'})`}
              >
                <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs ${
                  currentUser.role === 'admin' ? 'bg-purple-600' : 'bg-slate-900'
                }`}>
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-11 z-50 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 animate-popover">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {currentUser.name || 'User'}
                      </p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        currentUser.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {currentUser.role?.toUpperCase() || 'USER'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {currentUser.email}
                    </p>
                  </div>

                  {currentUser.role === 'admin' && (
                    <button
                      type="button"
                      onClick={() => {
                        onNavigateView(currentView === 'admin' ? 'dashboard' : 'admin');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-purple-700 hover:bg-purple-50 transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>{currentView === 'admin' ? 'Exit Admin Panel' : 'Admin Control Panel'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sub-Toolbar (Shown ONLY in Editor View on Mobile) */}
      {currentView === 'editor' && (
        <div className="md:hidden border-t border-slate-100 bg-slate-50/95 px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {/* Quick Color Button */}
          <button
            type="button"
            onClick={() => {
              setShowColorPicker(true);
              setShowFontPicker(false);
              setShowLayoutPicker(false);
            }}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 shadow-xs active:scale-95 transition-transform"
          >
            <div
              className="w-3.5 h-3.5 rounded-full ring-1 ring-black/10 shrink-0"
              style={{ backgroundColor: theme.primaryColor || '#00c598' }}
            />
            <span>Color</span>
          </button>

          {/* Quick Font Button */}
          <button
            type="button"
            onClick={() => {
              setShowFontPicker(true);
              setShowColorPicker(false);
              setShowLayoutPicker(false);
            }}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 shadow-xs active:scale-95 transition-transform"
          >
            <Type className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Font</span>
          </button>

          {/* Quick Layout Button */}
          <button
            type="button"
            onClick={() => {
              setShowLayoutPicker(true);
              setShowColorPicker(false);
              setShowFontPicker(false);
            }}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 shadow-xs active:scale-95 transition-transform"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Layout</span>
          </button>

          {/* Rearrange */}
          <button
            type="button"
            onClick={() => setShowRearrangeModal(true)}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 shadow-xs active:scale-95 transition-transform"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#00c598] shrink-0" />
            <span>Rearrange</span>
          </button>

          {/* Save Status */}
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 shadow-xs active:scale-95 transition-transform"
          >
            <Cloud className="w-3.5 h-3.5 text-[#00c598] shrink-0" />
            <span>{isSaving ? 'Saving...' : saveStatus || 'Save'}</span>
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 bg-white rounded-lg text-xs font-semibold text-slate-500 border border-slate-200 shadow-xs active:scale-95 transition-transform"
            title="Reset dummy data"
          >
            <RefreshCw className="w-3.5 h-3.5 shrink-0" />
            <span>Reset</span>
          </button>
        </div>
      )}

      {/* Render Mobile Sheets via Portal directly to body */}
      {renderMobileSheets()}

      {/* Rearrange Sections Modal */}
      {showRearrangeModal && (
        <RearrangeSectionsModal
          resume={resume}
          onResumeChange={onResumeChange}
          onClose={() => setShowRearrangeModal(false)}
        />
      )}
    </header>
  );
}

