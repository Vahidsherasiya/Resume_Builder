import React, { useState } from 'react';
import { Calendar, MapPin, Trash2, ChevronDown, Building2, Plus, X } from 'lucide-react';
import FloatingToolbar from '../UI/FloatingToolbar';
import EducationSettingsModal from '../Modals/EducationSettingsModal';

export default function EducationSection({ 
  section, 
  onChange, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onSwitchColumn, 
  theme 
}) {
  const [showSettings, setShowSettings] = useState(false);

  const items = section.items || [];
  const settings = section.settings || {
    showGpa: true,
    showInstitution: true,
    showLocation: false,
    showDatePeriod: true,
    showBullets: false,
    showLogo: false
  };

  const handleTitleChange = (val) => {
    onChange({
      ...section,
      title: val
    });
  };

  const handleSettingsChange = (newSettings) => {
    onChange({
      ...section,
      settings: newSettings
    });
  };

  const handleAddEntry = () => {
    const newItem = {
      id: 'edu-' + Date.now(),
      degree: 'Degree / Academic Program',
      institution: 'University / Institute Name',
      dateRange: '08/2022 - 05/2026',
      location: 'City, Country',
      gpa: '4.0',
      gpaMax: '4.0',
      bullets: ['Key coursework and academic achievements']
    };
    onChange({
      ...section,
      items: [...items, newItem]
    });
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange({
      ...section,
      items: updated
    });
  };

  const handleDeleteItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    onChange({
      ...section,
      items: updated
    });
  };

  const handleAddBullet = (eduIdx) => {
    const updated = [...items];
    const bullets = [...(updated[eduIdx].bullets || [])];
    bullets.push('Academic honor / project milestone');
    updated[eduIdx] = {
      ...updated[eduIdx],
      bullets
    };
    onChange({
      ...section,
      items: updated
    });
  };

  const handleEditBullet = (eduIdx, bIdx, val) => {
    const updated = [...items];
    const bullets = [...(updated[eduIdx].bullets || [])];
    bullets[bIdx] = val;
    updated[eduIdx] = {
      ...updated[eduIdx],
      bullets
    };
    onChange({
      ...section,
      items: updated
    });
  };

  const handleDeleteBullet = (eduIdx, bIdx) => {
    const updated = [...items];
    const bullets = updated[eduIdx].bullets.filter((_, i) => i !== bIdx);
    updated[eduIdx] = {
      ...updated[eduIdx],
      bullets
    };
    onChange({
      ...section,
      items: updated
    });
  };

  return (
    <div className="relative group mb-5">
      {/* Floating Action Toolbar */}
      <FloatingToolbar
        entryLabel="+ Entry"
        onAddEntry={handleAddEntry}
        onToggleSettings={() => setShowSettings(!showSettings)}
        onDeleteSection={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onSwitchColumn={onSwitchColumn}
        hasSettings={true}
        customActions={
          <button
            type="button"
            onClick={() => {
              const updated = { ...settings, showDatePeriod: !settings.showDatePeriod };
              handleSettingsChange(updated);
            }}
            title="Toggle Date Period"
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
          </button>
        }
      />

      {/* Settings Modal */}
      {showSettings && (
        <EducationSettingsModal
          settings={settings}
          onChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Section Header */}
      <div className="border-b-2 border-slate-900 pb-1 mb-2.5">
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleTitleChange(e.currentTarget.textContent || 'EDUCATION')}
          className="text-sm font-black tracking-wider uppercase text-slate-900 focus:outline-none"
        >
          {section.title || 'EDUCATION'}
        </h2>
      </div>

      {/* Education Items List */}
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`group/item relative pb-2.5 ${
              idx !== items.length - 1 ? 'border-b border-dashed border-slate-200' : ''
            }`}
          >
            {/* Delete Entry Button */}
            <button
              type="button"
              onClick={() => handleDeleteItem(idx)}
              className="absolute -right-2 top-0 p-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover/item:opacity-100 transition-opacity no-print"
              title="Delete this entry"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start justify-between gap-4">
              {/* Left Column */}
              <div className="flex-1 min-w-0 space-y-0.5">
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleItemChange(idx, 'degree', e.currentTarget.textContent || '')}
                  className="text-xs font-bold text-slate-900 focus:outline-none leading-snug"
                >
                  {item.degree}
                </div>

                {settings.showInstitution !== false && (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleItemChange(idx, 'institution', e.currentTarget.textContent || '')}
                    className="text-[11.5px] font-semibold hover:underline cursor-text focus:outline-none leading-snug"
                    style={{ color: '#0284c7' }}
                  >
                    {item.institution}
                  </div>
                )}

                {settings.showLocation && item.location && (
                  <div className="inline-flex items-center gap-1.5 text-[10.5px] text-slate-500 leading-none">
                    <span className="w-3 h-3 flex items-center justify-center flex-shrink-0 text-slate-400">
                      <MapPin className="w-3 h-3" />
                    </span>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleItemChange(idx, 'location', e.currentTarget.textContent || '')}
                      className="leading-none"
                    >
                      {item.location}
                    </span>
                  </div>
                )}

                {settings.showDatePeriod !== false && (
                  <div className="inline-flex items-center gap-1.5 text-[10.5px] text-slate-500 font-medium pt-0.5 leading-none">
                    <span className="w-3 h-3 flex items-center justify-center flex-shrink-0 text-slate-400">
                      <Calendar className="w-3 h-3" />
                    </span>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleItemChange(idx, 'dateRange', e.currentTarget.textContent || '')}
                      className="focus:outline-none leading-none"
                    >
                      {item.dateRange}
                    </span>
                  </div>
                )}
              </div>

              {/* Right Side: GPA Score Badge */}
              {settings.showGpa !== false && (
                <div className="flex-shrink-0 pl-3 border-l border-slate-300 flex flex-col items-center justify-center text-center min-w-[70px]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    GPA
                  </span>
                  <div className="flex items-center gap-0.5 text-xs font-bold text-[#0284c7]">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleItemChange(idx, 'gpa', e.currentTarget.textContent || '4.0')}
                      className="focus:outline-none"
                    >
                      {item.gpa || '4.0'}
                    </span>
                    <span className="text-slate-400 font-normal">/</span>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleItemChange(idx, 'gpaMax', e.currentTarget.textContent || '4.0')}
                      className="text-slate-500 font-normal focus:outline-none"
                    >
                      {item.gpaMax || '4.0'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bullets */}
            {settings.showBullets && (
              <div className="mt-1.5 pl-4">
                <ul className="list-disc list-outside space-y-0.5 text-[10.5px] text-slate-600">
                  {(item.bullets || ['Coursework in Algorithms & System Architecture']).map((bullet, bIdx) => (
                    <li key={bIdx} className="group/bullet relative">
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleEditBullet(idx, bIdx, e.currentTarget.textContent || '')}
                        className="focus:outline-none"
                      >
                        {bullet}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteBullet(idx, bIdx)}
                        className="ml-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover/bullet:opacity-100 transition-opacity no-print"
                      >
                        <X className="w-2.5 h-2.5 inline" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handleAddBullet(idx)}
                  className="text-[10px] text-[#00c598] hover:text-[#00a37e] font-semibold pt-0.5 no-print"
                >
                  + Add bullet
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
