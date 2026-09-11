import React, { useState, useRef } from 'react';
import {
  Camera, Settings, Phone, Mail, Link as LinkIcon,
  MapPin, Globe, Calendar, Flag, Sparkles, User
} from 'lucide-react';
import HeaderSettingsModal from '../Modals/HeaderSettingsModal';

export default function HeaderSection({ header, onChange, theme }) {
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef(null);

  const settings = header.settings || {
    showTitle: true,
    showPhone: true,
    showLink: true,
    showExtraLink: false,
    showEmail: true,
    showLocation: false,
    isUppercaseName: true,
    showPhoto: false,
    photoStyle: 'circle'
  };

  const handleTextChange = (field, value) => {
    onChange({
      ...header,
      [field]: value
    });
  };

  const handleSettingsChange = (newSettings) => {
    onChange({
      ...header,
      settings: newSettings
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          ...header,
          avatarUrl: reader.result,
          settings: { ...settings, showPhoto: true }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group pb-4 mb-4 border-b border-slate-200">
      {/* Centered Top Floating Buttons (Camera & Settings Gear) - Hidden in Print/PDF */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-toolbar border border-slate-200 p-1 opacity-90 group-hover:opacity-100 transition-all duration-200 no-print select-none">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Upload Photo"
          className="p-1.5 text-slate-600 hover:text-[#00c598] hover:bg-slate-100 rounded-full transition-colors"
        >
          <Camera className="w-4 h-4" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          title="Header Settings"
          className={`p-1.5 rounded-full transition-colors ${showSettings ? 'text-[#00c598] bg-[#00c598]/10' : 'text-slate-600 hover:text-[#00c598] hover:bg-slate-100'
            }`}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <HeaderSettingsModal
          settings={settings}
          onChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Header Content */}
      <div className="flex items-start justify-between gap-6 pt-2">
        <div className="flex-1 space-y-1">
          {/* Candidate Name */}
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTextChange('name', e.currentTarget.textContent || '')}
            className={`text-3xl font-extrabold tracking-tight text-slate-900 leading-tight focus:outline-none ${settings.isUppercaseName ? 'uppercase' : ''
              }`}
            style={{ color: '#0f172a' }}
          >
            {header.name || 'YOUR FULL NAME'}
          </h1>

          {/* Job Title / Candidate Designation */}
          {settings.showTitle && (
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleTextChange('title', e.currentTarget.textContent || '')}
              className="text-lg font-semibold tracking-wide leading-snug"
              style={{ color: theme.primaryColor || '#00c598' }}
            >
              {header.title || 'Full Stack Developer'}
            </div>
          )}

          {/* Contact Details Tags Row with baseline-aligned icons */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs font-medium text-slate-600">
            {settings.showPhone && (
              <div className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors leading-none">
                <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 text-[#3b82f6]">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('phone', e.currentTarget.textContent || '')}
                  className="px-0.5 leading-none"
                >
                  {header.phone || '+91 0000000000'}
                </span>
              </div>
            )}

            {settings.showEmail && (
              <div className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors leading-none">
                <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 text-[#3b82f6]">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('email', e.currentTarget.textContent || '')}
                  className="px-0.5 leading-none"
                >
                  {header.email || 'your.email@example.com'}
                </span>
              </div>
            )}

            {settings.showLink && (
              <div className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors leading-none">
                <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 text-[#3b82f6]">
                  <LinkIcon className="w-3.5 h-3.5" />
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('link', e.currentTarget.textContent || '')}
                  className="px-0.5 leading-none"
                >
                  {header.link || 'linkedin.com/in/profile'}
                </span>
              </div>
            )}

            {settings.showExtraLink && (
              <div className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors leading-none">
                <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 text-[#3b82f6]">
                  <Globe className="w-3.5 h-3.5" />
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('extraLink', e.currentTarget.textContent || '')}
                  className="px-0.5 leading-none"
                >
                  {header.extraLink || 'github.com/profile'}
                </span>
              </div>
            )}

            {settings.showLocation && (
              <div className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors leading-none">
                <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 text-[#3b82f6]">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('location', e.currentTarget.textContent || '')}
                  className="px-0.5 leading-none"
                >
                  {header.location || 'City, Country'}
                </span>
              </div>
            )}

            {settings.showDateOfBirth && (
              <div className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors leading-none">
                <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 text-[#3b82f6]">
                  <Calendar className="w-3.5 h-3.5" />
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('dateOfBirth', e.currentTarget.textContent || '')}
                  className="px-0.5 leading-none"
                >
                  {header.dateOfBirth || 'YYYY-MM-DD'}
                </span>
              </div>
            )}

            {settings.showNationality && (
              <div className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors leading-none">
                <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 text-[#3b82f6]">
                  <Flag className="w-3.5 h-3.5" />
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('nationality', e.currentTarget.textContent || '')}
                  className="px-0.5 leading-none"
                >
                  {header.nationality || 'Nationality'}
                </span>
              </div>
            )}

            {settings.showExtraField && (
              <div className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors leading-none">
                <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0 text-[#3b82f6]">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleTextChange('extraField', e.currentTarget.textContent || '')}
                  className="px-0.5 leading-none"
                >
                  {header.extraField || 'Portfolio / Highlights'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Candidate Photo */}
        {settings.showPhoto && (
          <div className="flex-shrink-0">
            {header.avatarUrl ? (
              <img
                src={header.avatarUrl}
                alt={header.name}
                className={`w-24 h-24 object-cover border-2 border-slate-200 shadow-sm ${settings.photoStyle === 'rounded'
                  ? 'rounded-xl'
                  : settings.photoStyle === 'square'
                    ? 'rounded-none'
                    : 'rounded-full'
                  }`}
              />
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`w-24 h-24 bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:border-[#3b82f6] cursor-pointer transition-colors no-print ${settings.photoStyle === 'rounded'
                  ? 'rounded-xl'
                  : settings.photoStyle === 'square'
                    ? 'rounded-none'
                    : 'rounded-full'
                  }`}
              >
                <User className="w-8 h-8" />
                <span className="text-[10px] mt-1 font-medium">Add Photo</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
