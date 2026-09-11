import React from 'react';
import { Trash2, Plus, X } from 'lucide-react';
import FloatingToolbar from '../UI/FloatingToolbar';

export default function CustomSection({ 
  section, 
  onChange, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onSwitchColumn, 
  theme 
}) {
  const items = section.items || [];

  const handleTitleChange = (val) => {
    onChange({
      ...section,
      title: val
    });
  };

  const handleAddEntry = () => {
    const newItem = {
      id: 'custom-' + Date.now(),
      title: 'Item Title / Heading',
      subtitle: 'Optional subtitle or organization',
      description: 'Detail description of this achievement or project.'
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
        onDeleteSection={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onSwitchColumn={onSwitchColumn}
        hasSettings={false}
      />

      {/* Section Header */}
      <div className="border-b-2 border-slate-900 pb-1 mb-2.5">
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleTitleChange(e.currentTarget.textContent || 'CUSTOM SECTION')}
          className="text-sm font-black tracking-wider uppercase text-slate-900 focus:outline-none"
        >
          {section.title || 'CUSTOM SECTION'}
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="group/item relative space-y-0.5">
            <button
              type="button"
              onClick={() => handleDeleteItem(idx)}
              className="absolute -right-2 top-0 p-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover/item:opacity-100 transition-opacity no-print"
              title="Delete item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleItemChange(idx, 'title', e.currentTarget.textContent || '')}
              className="text-xs font-bold text-slate-900 focus:outline-none leading-snug"
            >
              {item.title}
            </div>

            {item.subtitle && (
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleItemChange(idx, 'subtitle', e.currentTarget.textContent || '')}
                className="text-[11px] text-[#0284c7] font-semibold focus:outline-none leading-snug"
              >
                {item.subtitle}
              </div>
            )}

            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleItemChange(idx, 'description', e.currentTarget.textContent || '')}
              className="text-[10.5px] text-slate-600 leading-relaxed focus:outline-none"
            >
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
