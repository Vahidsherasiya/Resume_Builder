import React from 'react';
import { Award, Trash2 } from 'lucide-react';
import FloatingToolbar from '../UI/FloatingToolbar';

export default function CertificationsSection({ 
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
      id: 'cert-' + Date.now(),
      title: 'Certificate Name / Course Title',
      issuer: 'Govt. Recognized Certification',
      date: '2024'
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
        entryLabel="+ Certificate"
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
          onBlur={(e) => handleTitleChange(e.currentTarget.textContent || 'CERTIFICATIONS')}
          className="text-sm font-black tracking-wider uppercase text-slate-900 focus:outline-none"
        >
          {section.title || 'CERTIFICATIONS'}
        </h2>
      </div>

      {/* Certifications List */}
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="group/item relative flex items-start justify-between">
            <div>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleItemChange(idx, 'title', e.currentTarget.textContent || '')}
                className="text-xs font-bold text-slate-900 focus:outline-none leading-snug"
              >
                {item.title}
              </div>
              {item.issuer && (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleItemChange(idx, 'issuer', e.currentTarget.textContent || '')}
                  className="text-[10.5px] text-slate-500 focus:outline-none leading-snug"
                >
                  {item.issuer} {item.date ? `(${item.date})` : ''}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleDeleteItem(idx)}
              className="p-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover/item:opacity-100 transition-opacity no-print"
              title="Delete certification"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
