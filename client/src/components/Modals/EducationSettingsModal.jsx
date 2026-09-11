import React, { useEffect, useRef } from 'react';
import ToggleSwitch from '../UI/ToggleSwitch';

export default function EducationSettingsModal({ settings = {}, onChange, onClose }) {
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
          label="GPA"
          checked={settings.showGpa !== false}
          onChange={() => toggle('showGpa')}
        />
        <ToggleSwitch
          label="Institution"
          checked={settings.showInstitution !== false}
          onChange={() => toggle('showInstitution')}
        />
        <ToggleSwitch
          label="Location"
          checked={settings.showLocation || false}
          onChange={() => toggle('showLocation')}
        />
        <ToggleSwitch
          label="Date Period"
          checked={settings.showDatePeriod !== false}
          onChange={() => toggle('showDatePeriod')}
        />
        <ToggleSwitch
          label="Bullets"
          checked={settings.showBullets || false}
          onChange={() => toggle('showBullets')}
        />
        <ToggleSwitch
          label="Institution Logo"
          checked={settings.showLogo || false}
          onChange={() => toggle('showLogo')}
        />
      </div>
    </div>
  );
}
