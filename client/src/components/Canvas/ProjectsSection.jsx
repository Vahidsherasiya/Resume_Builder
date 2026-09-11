import React from 'react';
import { Calendar, Trash2, Plus, X } from 'lucide-react';
import FloatingToolbar from '../UI/FloatingToolbar';

export default function ProjectsSection({ 
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

  const handleAddProject = () => {
    const newProj = {
      id: 'proj-' + Date.now(),
      name: 'New Project Title',
      dateRange: 'MM/YYYY',
      subtitle: 'Brief stack & architecture overview',
      bullets: [
        'Built modern full-stack web application with responsive UI and secure backend',
        'Implemented state management and optimized API response times'
      ]
    };
    onChange({
      ...section,
      items: [...items, newProj]
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

  const handleAddBullet = (projIdx) => {
    const updated = [...items];
    const bullets = [...(updated[projIdx].bullets || [])];
    bullets.push('Added new feature and performance enhancement');
    updated[projIdx] = {
      ...updated[projIdx],
      bullets
    };
    onChange({
      ...section,
      items: updated
    });
  };

  const handleEditBullet = (projIdx, bulletIdx, val) => {
    const updated = [...items];
    const bullets = [...(updated[projIdx].bullets || [])];
    bullets[bulletIdx] = val;
    updated[projIdx] = {
      ...updated[projIdx],
      bullets
    };
    onChange({
      ...section,
      items: updated
    });
  };

  const handleDeleteBullet = (projIdx, bulletIdx) => {
    const updated = [...items];
    const bullets = updated[projIdx].bullets.filter((_, i) => i !== bulletIdx);
    updated[projIdx] = {
      ...updated[projIdx],
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
        entryLabel="+ Project"
        onAddEntry={handleAddProject}
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
          onBlur={(e) => handleTitleChange(e.currentTarget.textContent || 'PROJECTS')}
          className="text-sm font-black tracking-wider uppercase text-slate-900 focus:outline-none"
        >
          {section.title || 'PROJECTS'}
        </h2>
      </div>

      {/* Projects Items List */}
      <div className="space-y-3.5">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="group/item relative space-y-1">
            {/* Delete Project Button */}
            <button
              type="button"
              onClick={() => handleDeleteItem(idx)}
              className="absolute -right-2 top-0 p-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover/item:opacity-100 transition-opacity no-print"
              title="Delete this project"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Project Title */}
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleItemChange(idx, 'name', e.currentTarget.textContent || '')}
              className="text-xs font-bold text-slate-900 focus:outline-none leading-snug"
            >
              {item.name}
            </div>

            {/* Date Range with Calendar Icon */}
            <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 font-medium leading-none">
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

            {/* Subtitle */}
            {item.subtitle && (
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleItemChange(idx, 'subtitle', e.currentTarget.textContent || '')}
                className="text-[11px] text-slate-600 font-medium leading-tight focus:outline-none"
              >
                {item.subtitle}
              </div>
            )}

            {/* Bullet points */}
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

            {/* Quick Add Bullet Link */}
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
