import React, { useState } from 'react';
import FloatingToolbar from '../UI/FloatingToolbar';

export default function SummarySection({ 
  section, 
  onChange, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onSwitchColumn, 
  theme 
}) {
  const [isBullets, setIsBullets] = useState(section.settings?.isBullet || false);

  const handleTitleChange = (val) => {
    onChange({
      ...section,
      title: val
    });
  };

  const handleContentChange = (val) => {
    onChange({
      ...section,
      content: val
    });
  };

  const toggleBullets = () => {
    const next = !isBullets;
    setIsBullets(next);
    onChange({
      ...section,
      settings: { ...section.settings, isBullet: next }
    });
  };

  return (
    <div className="relative group mb-5">
      <FloatingToolbar
        entryLabel="+ Entry"
        hasBullets={true}
        hasSettings={false}
        onToggleFormat={toggleBullets}
        onDeleteSection={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onSwitchColumn={onSwitchColumn}
      />

      {/* Section Header */}
      <div className="border-b-2 border-slate-900 pb-1 mb-2">
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleTitleChange(e.currentTarget.textContent || 'SUMMARY')}
          className="text-sm font-black tracking-wider uppercase text-slate-900 focus:outline-none"
        >
          {section.title || 'SUMMARY'}
        </h2>
      </div>

      {/* Summary Content Body */}
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => handleContentChange(e.currentTarget.textContent || '')}
        className="text-[11.5px] leading-relaxed text-slate-700 text-justify focus:outline-none"
      >
        {section.content || 'Add your professional summary here...'}
      </div>
    </div>
  );
}
