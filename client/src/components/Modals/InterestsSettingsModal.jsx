import React, { useEffect, useRef } from 'react';
import ToggleSwitch from '../UI/ToggleSwitch';

export default function InterestsSettingsModal({ settings = {}, onChange, onClose }) {
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

  return (
    <div
      ref={modalRef}
      className="absolute top-10 right-0 z-50 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 text-slate-800 animate-popover text-left gear-popup font-sans"
    >
      <div className="space-y-1">
        <ToggleSwitch
          label="Description"
          checked={settings.showDescription !== false}
          onChange={() => toggle('showDescription')}
        />
        <ToggleSwitch
          label="Icons"
          checked={settings.showIcons !== false}
          onChange={() => toggle('showIcons')}
        />
      </div>
    </div>
  );
}
