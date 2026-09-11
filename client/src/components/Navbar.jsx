import React, { useState } from 'react';
import { 
  Download, Printer, Save, RefreshCw, Palette, 
  Type, LayoutGrid, Check, Sparkles, Cloud, Share2, 
  ArrowUpDown, SlidersHorizontal 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import RearrangeSectionsModal from './Modals/RearrangeSectionsModal';

const THEME_COLORS = [
  { name: 'Teal (Enhancv)', value: '#00c598' },
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
  isSaving,
  saveStatus
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [showLayoutPicker, setShowLayoutPicker] = useState(false);
  const [showRearrangeModal, setShowRearrangeModal] = useState(false);

  const theme = resume.theme || {};

  const updateTheme = (updates) => {
    onResumeChange({
      ...resume,
      theme: {
        ...theme,
        ...updates
      }
    });
  };

  const handleConfettiAndDownload = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.2 }
    });
    onDownloadPdf();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo & Document Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00a37e] to-[#00c598] flex items-center justify-center text-white font-black text-lg shadow-sm">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base">
                Enhancv <span className="text-[#00c598] font-medium text-xs bg-[#e6faf5] px-2 py-0.5 rounded-full border border-[#00c598]/30">A4 Builder</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Pixel-perfect MERN Resume & Live Editor
            </p>
          </div>
        </div>

        {/* Center Customization Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Rearrange Sections Button */}
          <button
            type="button"
            onClick={() => setShowRearrangeModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Rearrange Sections"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#00c598]" />
            <span className="hidden md:inline">Rearrange</span>
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
              <span className="hidden md:inline">Color</span>
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
              <span className="hidden md:inline">Font</span>
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
              <span className="hidden md:inline">Layout</span>
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

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Save to MERN Backend */}
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Save to MongoDB"
          >
            <Cloud className="w-4 h-4 text-[#00c598]" />
            <span className="hidden sm:inline">
              {isSaving ? 'Saving...' : saveStatus || 'Save'}
            </span>
          </button>

          {/* Reset Template */}
          <button
            type="button"
            onClick={onReset}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset to Default"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Print A4 */}
          <button
            type="button"
            onClick={onPrint}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title="Print A4"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Download PDF (A4 Export) */}
          <button
            type="button"
            onClick={handleConfettiAndDownload}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#00c598] to-[#00a37e] hover:from-[#00a37e] hover:to-[#008f6e] rounded-lg shadow-sm hover:shadow transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

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
