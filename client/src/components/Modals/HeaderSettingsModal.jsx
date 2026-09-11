import React, { useEffect, useRef } from 'react';
import ToggleSwitch from '../UI/ToggleSwitch';
import { User, Image as ImageIcon } from 'lucide-react';

export default function HeaderSettingsModal({ settings, onChange, onClose }) {
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

  const toggle = (key) => {
    onChange({
      ...settings,
      [key]: !settings[key]
    });
  };

  const setPhotoStyle = (style) => {
    onChange({
      ...settings,
      photoStyle: style
    });
  };

  return (
    <div
      ref={modalRef}
      className="absolute top-12 left-1/2 -translate-x-1/2 z-50 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 text-slate-800 animate-popover text-left gear-popup font-sans"
    >
      <div className="space-y-1 divide-y divide-slate-100">
        <div className="pb-2 space-y-0.5">
          <ToggleSwitch label="Title" checked={settings.showTitle} onChange={() => toggle('showTitle')} />
          <ToggleSwitch label="Phone" checked={settings.showPhone} onChange={() => toggle('showPhone')} />
          <ToggleSwitch label="Link" checked={settings.showLink} onChange={() => toggle('showLink')} />
          <ToggleSwitch label="Extra Link" checked={settings.showExtraLink} onChange={() => toggle('showExtraLink')} />
          <ToggleSwitch label="Email" checked={settings.showEmail} onChange={() => toggle('showEmail')} />
          <ToggleSwitch label="Location" checked={settings.showLocation} onChange={() => toggle('showLocation')} />
          <ToggleSwitch label="Uppercase name" checked={settings.isUppercaseName} onChange={() => toggle('isUppercaseName')} />
          <ToggleSwitch label="Photo" checked={settings.showPhoto} onChange={() => toggle('showPhoto')} />
          <ToggleSwitch label="Extra Field" checked={settings.showExtraField} onChange={() => toggle('showExtraField')} />
          <ToggleSwitch label="Date of Birth" checked={settings.showDateOfBirth} onChange={() => toggle('showDateOfBirth')} />
          <ToggleSwitch label="Nationality" checked={settings.showNationality} onChange={() => toggle('showNationality')} />
        </div>

        {/* Photo Style Selection */}
        {settings.showPhoto && (
          <div className="pt-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Photo Style</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPhotoStyle('circle')}
                title="Circle"
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  settings.photoStyle === 'circle'
                    ? 'border-[#00c598] bg-[#00c598]/20 scale-110'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setPhotoStyle('rounded')}
                title="Rounded"
                className={`w-6 h-6 rounded-md border-2 transition-all ${
                  settings.photoStyle === 'rounded'
                    ? 'border-[#00c598] bg-[#00c598]/20 scale-110'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setPhotoStyle('square')}
                title="Square"
                className={`w-6 h-6 rounded-none border-2 transition-all ${
                  settings.photoStyle === 'square'
                    ? 'border-[#00c598] bg-[#00c598]/20 scale-110'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              />
              <User className="w-5 h-5 text-slate-400 ml-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
