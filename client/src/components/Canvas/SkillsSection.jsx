import React, { useState } from 'react';
import { Plus, Trash2, X, FolderPlus } from 'lucide-react';
import FloatingToolbar from '../UI/FloatingToolbar';
import SkillsSettingsModal from '../Modals/SkillsSettingsModal';

export default function SkillsSection({ 
  section, 
  onChange, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onSwitchColumn, 
  theme 
}) {
  const [showSettings, setShowSettings] = useState(false);

  const groups = section.groups || [
    {
      id: 'grp-1',
      name: 'Skills',
      skills: []
    }
  ];

  const settings = section.settings || {
    showGroupName: false,
    layout: 'tags',
    borderStyle: 'solid'
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

  const handleAddSkill = (groupIndex = 0) => {
    const promptSkill = window.prompt('Enter new skill name:', 'TypeScript');
    if (!promptSkill || !promptSkill.trim()) return;

    const updatedGroups = [...groups];
    updatedGroups[groupIndex] = {
      ...updatedGroups[groupIndex],
      skills: [...updatedGroups[groupIndex].skills, promptSkill.trim()]
    };

    onChange({
      ...section,
      groups: updatedGroups
    });
  };

  const handleAddGroup = () => {
    const groupName = window.prompt('Enter skill group name (e.g. Frontend, Databases):', 'Database Tools');
    if (!groupName) return;

    const newGroup = {
      id: 'grp-' + Date.now(),
      name: groupName,
      skills: ['PostgreSQL', 'Redis']
    };

    onChange({
      ...section,
      groups: [...groups, newGroup],
      settings: { ...settings, showGroupName: true }
    });
  };

  const handleEditSkill = (groupIndex, skillIndex, val) => {
    const updatedGroups = [...groups];
    const skills = [...updatedGroups[groupIndex].skills];
    skills[skillIndex] = val;
    updatedGroups[groupIndex] = {
      ...updatedGroups[groupIndex],
      skills
    };
    onChange({
      ...section,
      groups: updatedGroups
    });
  };

  const handleDeleteSkill = (groupIndex, skillIndex) => {
    const updatedGroups = [...groups];
    const skills = updatedGroups[groupIndex].skills.filter((_, idx) => idx !== skillIndex);
    updatedGroups[groupIndex] = {
      ...updatedGroups[groupIndex],
      skills
    };
    onChange({
      ...section,
      groups: updatedGroups
    });
  };

  const layout = settings.layout || 'tags';

  return (
    <div className="relative group mb-5">
      {/* Floating Toolbar matching Screenshot 4 with Reorder actions */}
      <FloatingToolbar
        entryLabel="+ Skill"
        onAddEntry={() => handleAddSkill(0)}
        onToggleSettings={() => setShowSettings(!showSettings)}
        onDeleteSection={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onSwitchColumn={onSwitchColumn}
        hasSettings={true}
        customActions={
          <button
            type="button"
            onClick={handleAddGroup}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors shadow-sm"
          >
            + Group
          </button>
        }
      />

      {/* Settings Modal */}
      {showSettings && (
        <SkillsSettingsModal
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
          onBlur={(e) => handleTitleChange(e.currentTarget.textContent || 'SKILLS')}
          className="text-sm font-black tracking-wider uppercase text-slate-900 focus:outline-none"
        >
          {section.title || 'SKILLS'}
        </h2>
      </div>

      {/* Groups & Skills Display */}
      <div className="space-y-3">
        {groups.map((group, grpIdx) => (
          <div key={group.id || grpIdx} className="space-y-1.5">
            {settings.showGroupName && (
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => {
                  const updatedGroups = [...groups];
                  updatedGroups[grpIdx].name = e.currentTarget.textContent || '';
                  onChange({ ...section, groups: updatedGroups });
                }}
                className="text-xs font-bold text-slate-700 tracking-wide focus:outline-none"
              >
                {group.name}
              </div>
            )}

            {/* Tags Layout */}
            {layout === 'tags' && (
              <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 items-center">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`group/tag relative inline-flex items-center text-[11px] font-semibold text-slate-800 transition-colors py-0.5 ${
                      settings.borderStyle !== 'none' ? 'border-b border-slate-300 hover:border-slate-800' : ''
                    }`}
                  >
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleEditSkill(grpIdx, sIdx, e.currentTarget.textContent || '')}
                      className="px-0.5 focus:outline-none"
                    >
                      {skill}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(grpIdx, sIdx)}
                      className="ml-1 text-slate-300 hover:text-rose-600 opacity-0 group-hover/tag:opacity-100 transition-opacity no-print"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}

                {/* Quick Add Tag Button (hidden in PDF / print) */}
                <button
                  type="button"
                  onClick={() => handleAddSkill(grpIdx)}
                  className="no-print text-[10.5px] text-[#00c598] hover:text-[#00a37e] font-bold px-1.5 py-0.5 border border-dashed border-[#00c598]/50 rounded hover:border-[#00c598] transition-colors"
                >
                  + Add
                </button>
              </div>
            )}

            {/* List Layout */}
            {layout === 'list' && (
              <div className="grid grid-cols-2 gap-1 text-[11px] font-medium text-slate-700">
                {group.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="group/listitem flex items-center justify-between py-0.5">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleEditSkill(grpIdx, sIdx, e.currentTarget.textContent || '')}
                    >
                      {skill}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(grpIdx, sIdx)}
                      className="text-slate-300 hover:text-rose-600 opacity-0 group-hover/listitem:opacity-100 transition-opacity no-print"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Bullets Layout */}
            {layout === 'bullets' && (
              <ul className="list-disc list-inside space-y-0.5 text-[11px] font-medium text-slate-700">
                {group.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="group/bulletitem">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleEditSkill(grpIdx, sIdx, e.currentTarget.textContent || '')}
                      className="inline-block"
                    >
                      {skill}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(grpIdx, sIdx)}
                      className="ml-2 text-slate-300 hover:text-rose-600 opacity-0 group-hover/bulletitem:opacity-100 transition-opacity no-print"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
