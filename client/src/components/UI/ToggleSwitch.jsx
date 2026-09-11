import React from 'react';

export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-1.5 select-none group">
      {label && (
        <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
          {label}
        </span>
      )}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onChange(!checked);
        }}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          checked ? 'bg-[#00c598]' : 'bg-slate-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </label>
  );
}
