import React, { useEffect, useRef } from 'react';
import ToggleSwitch from '../UI/ToggleSwitch';

export default function LanguagesSettingsModal({ settings = {}, onChange, onClose }) {
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

  const setSliderStyle = (style) => {
    onChange({
      ...settings,
      sliderStyle: style
    });
  };

  return (
    <div
      ref={modalRef}
      className="absolute top-10 right-0 z-50 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 text-slate-800 animate-popover text-left gear-popup font-sans"
    >
      <div className="space-y-3 divide-y divide-slate-100">
        <div className="space-y-1 pb-1">
          <ToggleSwitch
            label="Proficiency"
            checked={settings.showProficiency !== false}
            onChange={() => toggle('showProficiency')}
          />
          <ToggleSwitch
            label="Slider"
            checked={settings.showSlider !== false}
            onChange={() => toggle('showSlider')}
          />
        </div>

        {/* Slider Style */}
        {settings.showSlider !== false && (
          <div className="pt-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Slider Style</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSliderStyle('dots')}
                title="Dots style"
                className="flex items-center gap-0.5 p-1 rounded hover:bg-slate-100"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#00c598]" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </button>
              <button
                type="button"
                onClick={() => setSliderStyle('bar')}
                title="Continuous bar style"
                className="w-12 h-2.5 rounded-full bg-slate-200 overflow-hidden relative"
              >
                <div className="h-full bg-[#00c598] w-2/3 rounded-full" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
