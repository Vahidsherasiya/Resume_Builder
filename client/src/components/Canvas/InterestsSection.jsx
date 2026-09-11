import React, { useState } from 'react';
import { 
  Lightbulb, Compass, BookOpen, Music, Bike, 
  Gamepad2, Camera, Palette, Globe, Trash2 
} from 'lucide-react';
import FloatingToolbar from '../UI/FloatingToolbar';
import InterestsSettingsModal from '../Modals/InterestsSettingsModal';

const INTEREST_ICONS = {
  lightbulb: Lightbulb,
  compass: Compass,
  book: BookOpen,
  music: Music,
  bike: Bike,
  gamepad: Gamepad2,
  camera: Camera,
  palette: Palette,
  globe: Globe
};

export default function InterestsSection({ 
  section, 
  onChange, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onSwitchColumn, 
  theme 
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [activeIconPickerIdx, setActiveIconPickerIdx] = useState(null);

  const items = section.items || [
    {
      id: 'int-1',
      icon: 'lightbulb',
      title: 'Interests',
      description: 'Technology Reading, Music, Sports'
    }
  ];

  const settings = section.settings || {
    showDescription: true,
    showIcons: true
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
      id: 'int-' + Date.now(),
      icon: 'lightbulb',
      title: 'New Interest Category',
      description: 'Open Source, Tech Blogging, Chess, Travel'
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
        <InterestsSettingsModal
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
          onBlur={(e) => handleTitleChange(e.currentTarget.textContent || 'INTERESTS')}
          className="text-sm font-black tracking-wider uppercase text-slate-900 focus:outline-none"
        >
          {section.title || 'INTERESTS'}
        </h2>
      </div>

      {/* Interests Items List */}
      <div className="space-y-3">
        {items.map((item, idx) => {
          const IconComponent = INTEREST_ICONS[item.icon] || Lightbulb;
          return (
            <div key={item.id || idx} className="group/item relative flex items-start gap-2.5">
              <button
                type="button"
                onClick={() => handleDeleteItem(idx)}
                className="absolute -right-2 top-0 p-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover/item:opacity-100 transition-opacity no-print"
                title="Delete this interest"
              >
                <Trash2 className="w-3 h-3" />
              </button>

              {/* Icon */}
              {settings.showIcons !== false && (
                <div className="relative pt-0.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveIconPickerIdx(activeIconPickerIdx === idx ? null : idx)}
                    className="w-4 h-4 flex items-center justify-center text-[#0284c7] hover:bg-sky-50 transition-colors"
                    title="Change Icon"
                  >
                    <IconComponent className="w-4 h-4" />
                  </button>

                  {/* Icon Selector Menu */}
                  {activeIconPickerIdx === idx && (
                    <div className="absolute top-6 left-0 z-40 bg-white p-2 rounded-lg shadow-xl border border-slate-200 grid grid-cols-3 gap-1.5 no-print animate-popover">
                      {Object.keys(INTEREST_ICONS).map((iconKey) => {
                        const Icon = INTEREST_ICONS[iconKey];
                        return (
                          <button
                            key={iconKey}
                            type="button"
                            onClick={() => {
                              handleItemChange(idx, 'icon', iconKey);
                              setActiveIconPickerIdx(null);
                            }}
                            className="p-1.5 rounded hover:bg-sky-50 text-[#0284c7]"
                          >
                            <Icon className="w-4 h-4" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleItemChange(idx, 'title', e.currentTarget.textContent || '')}
                  className="text-xs font-bold text-slate-900 focus:outline-none leading-snug"
                >
                  {item.title || 'Interests'}
                </div>

                {settings.showDescription !== false && (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleItemChange(idx, 'description', e.currentTarget.textContent || '')}
                    className="text-[10.5px] leading-relaxed text-slate-600 focus:outline-none mt-0.5"
                  >
                    {item.description || 'Technology Reading, Music, Sports'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
