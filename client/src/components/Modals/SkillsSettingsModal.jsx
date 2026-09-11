import React, { useEffect, useRef } from 'react';
import ToggleSwitch from '../UI/ToggleSwitch';

export default function SkillsSettingsModal({ settings = {}, onChange, onClose }) {
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

  const setLayout = (layout) => {
    onChange({
      ...settings,
      layout
    });
  };

  const setBorderStyle = (style) => {
    onChange({
      ...settings,
      borderStyle: style
    });
  };

  const currentLayout = settings.layout || 'tags';

  return (
    <div
      ref={modalRef}
      className="absolute top-10 right-0 z-50 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 text-slate-800 animate-popover text-left gear-popup font-sans"
    >
      <div className="space-y-3 divide-y divide-slate-100">
        <div className="pb-1">
          <ToggleSwitch
            label="Group Name"
            checked={settings.showGroupName || false}
            onChange={() => toggle('showGroupName')}
          />
        </div>

        {/* Skills Layout */}
        <div className="pt-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Skills Layout
          </span>
          <div className="space-y-2">
            {[
              { id: 'tags', label: 'Tags' },
              { id: 'list', label: 'List' },
              { id: 'bullets', label: 'Bullets' }
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                <input
                  type="radio"
                  name="skills-layout"
                  checked={currentLayout === item.id}
                  onChange={() => setLayout(item.id)}
                  className="w-4 h-4 text-[#00c598] focus:ring-[#00c598] border-slate-300 accent-[#00c598] cursor-pointer"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Border Style */}
        <div className="pt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Border style</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setBorderStyle('none')}
              title="No Border"
              className={`w-5 h-5 rounded-full border border-slate-300 transition-all ${
                settings.borderStyle === 'none' ? 'bg-slate-300 scale-110 ring-2 ring-slate-400' : 'bg-slate-100'
              }`}
            />
            <button
              type="button"
              onClick={() => setBorderStyle('solid')}
              title="Solid Border"
              className={`w-5 h-5 rounded-full border border-[#00c598] transition-all ${
                settings.borderStyle !== 'none' ? 'bg-[#00c598] scale-110 ring-2 ring-[#00c598]/40' : 'bg-transparent'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
