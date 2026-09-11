import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import FloatingToolbar from '../UI/FloatingToolbar';
import RatingDots from '../UI/RatingDots';
import LanguagesSettingsModal from '../Modals/LanguagesSettingsModal';

export default function LanguagesSection({ 
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
    showProficiency: true,
    showSlider: true,
    sliderStyle: 'dots'
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
      id: 'lang-' + Date.now(),
      language: 'New Language',
      proficiency: 'Conversational',
      rating: 4
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

  return (
    <div className="relative group mb-5">
      <FloatingToolbar
        entryLabel="+ Entry"
        onAddEntry={handleAddEntry}
        onToggleSettings={() => setShowSettings(!showSettings)}
        onDeleteSection={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onSwitchColumn={onSwitchColumn}
        hasSettings={true}
      />

      {/* Settings Modal */}
      {showSettings && (
        <LanguagesSettingsModal
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
          onBlur={(e) => handleTitleChange(e.currentTarget.textContent || 'LANGUAGES')}
          className="text-sm font-black tracking-wider uppercase text-slate-900 focus:outline-none"
        >
          {section.title || 'LANGUAGES'}
        </h2>
      </div>

      {/* Languages List */}
      <div className="space-y-2.5">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`group/item relative flex items-center justify-between pb-2 ${
              idx !== items.length - 1 ? 'border-b border-dashed border-slate-200' : ''
            }`}
          >
            {/* Left: Language Name and Proficiency */}
            <div>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleItemChange(idx, 'language', e.currentTarget.textContent || '')}
                className="text-xs font-bold text-slate-900 focus:outline-none leading-snug"
              >
                {item.language}
              </div>

              {settings.showProficiency !== false && (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleItemChange(idx, 'proficiency', e.currentTarget.textContent || '')}
                  className="text-[10.5px] text-slate-500 font-medium focus:outline-none leading-snug"
                >
                  {item.proficiency}
                </div>
              )}
            </div>

            {/* Right: Slider / Rating Dots / Delete Button */}
            <div className="flex items-center gap-3">
              {settings.showSlider !== false && (
                <div>
                  {settings.sliderStyle === 'bar' ? (
                    <div
                      className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const rating = Math.max(1, Math.min(5, Math.ceil((clickX / rect.width) * 5)));
                        handleItemChange(idx, 'rating', rating);
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${((item.rating || 4) / 5) * 100}%`,
                          backgroundColor: '#0284c7'
                        }}
                      />
                    </div>
                  ) : (
                    <RatingDots
                      rating={item.rating || 4}
                      color="#0284c7"
                      onChange={(newRating) => handleItemChange(idx, 'rating', newRating)}
                    />
                  )}
                </div>
              )}

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleDeleteItem(idx)}
                className="p-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover/item:opacity-100 transition-opacity no-print"
                title="Delete this language"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
