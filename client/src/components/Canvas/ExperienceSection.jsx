import React from 'react';
import { Calendar, MapPin, Trash2, X } from 'lucide-react';
import FloatingToolbar from '../UI/FloatingToolbar';

export default function ExperienceSection({ 
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

  const handleAddExperience = () => {
    const newExp = {
      id: 'exp-' + Date.now(),
      role: 'Full Stack Developer / Software Engineer',
      company: 'Company / Organization Name',
      dateRange: 'MM/YYYY - Present',
      location: 'City, Country',
      bullets: [
        'Developed scalable REST APIs and modern web application features',
        'Collaborated with cross-functional teams in an Agile development cycle'
      ]
    };
    onChange({
      ...section,
      items: [...items, newExp]
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

  const handleAddBullet = (expIdx) => {
    const updated = [...items];
    const bullets = [...(updated[expIdx].bullets || [])];
    bullets.push('Spearheaded key performance and architectural improvements');
    updated[expIdx] = {
      ...updated[expIdx],
      bullets
    };
    onChange({
      ...section,
      items: updated
    });
  };

  const handleEditBullet = (expIdx, bulletIdx, val) => {
    const updated = [...items];
    const bullets = [...(updated[expIdx].bullets || [])];
    bullets[bulletIdx] = val;
    updated[expIdx] = {
      ...updated[expIdx],
      bullets
    };
    onChange({
      ...section,
      items: updated
    });
  };

  const handleDeleteBullet = (expIdx, bulletIdx) => {
    const updated = [...items];
    const bullets = updated[expIdx].bullets.filter((_, i) => i !== bulletIdx);
    updated[expIdx] = {
      ...updated[expIdx],
      bullets
    };
    onChange({
      ...section,
      items: updated
    });
  };

  return (
    <div className="relative group mb-5">
      <FloatingToolbar
        entryLabel="+ Experience"
        onAddEntry={handleAddExperience}
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
          onBlur={(e) => handleTitleChange(e.currentTarget.textContent || 'WORK EXPERIENCE')}
          className="text-sm font-black tracking-wider uppercase text-slate-900 focus:outline-none"
        >
          {section.title || 'WORK EXPERIENCE'}
        </h2>
      </div>

      {/* Experience Items */}
      <div className="space-y-3.5">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="group/item relative space-y-1">
            <button
              type="button"
              onClick={() => handleDeleteItem(idx)}
              className="absolute -right-2 top-0 p-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover/item:opacity-100 transition-opacity no-print"
              title="Delete this role"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Role Title */}
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleItemChange(idx, 'role', e.currentTarget.textContent || '')}
              className="text-xs font-bold text-slate-900 focus:outline-none leading-snug"
            >
              {item.role}
            </div>

            {/* Company & Date */}
            <div className="flex items-center justify-between text-[11px]">
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleItemChange(idx, 'company', e.currentTarget.textContent || '')}
                className="font-semibold text-[#0284c7] focus:outline-none leading-snug"
              >
                {item.company}
              </span>
              <div className="inline-flex items-center gap-1 text-[10px] text-slate-500 leading-none">
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
            </div>

            {/* Bullets */}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="list-disc list-outside pl-4 space-y-1 text-[11px] text-slate-600 leading-relaxed pt-0.5">
                {item.bullets.map((bullet, bIdx) => (
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
            )}

            <button
              type="button"
              onClick={() => handleAddBullet(idx)}
              className="text-[10px] text-[#00c598] hover:text-[#00a37e] font-semibold pl-4 pt-0.5 opacity-0 group-hover/item:opacity-100 transition-opacity no-print"
            >
              + Add bullet point
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
