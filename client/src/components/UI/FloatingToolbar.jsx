import React from 'react';
import { 
  Plus, Trash2, Settings, Type, List, 
  ArrowUp, ArrowDown, ArrowLeftRight 
} from 'lucide-react';

export default function FloatingToolbar({
  onAddEntry,
  onToggleSettings,
  onDeleteSection,
  onToggleFormat,
  onMoveUp,
  onMoveDown,
  onSwitchColumn,
  hasSettings = true,
  hasAddEntry = true,
  hasBullets = false,
  entryLabel = '+ Entry',
  customActions
}) {
  return (
    <div className="absolute -top-4 right-0 z-30 flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-full shadow-toolbar border border-slate-200 p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 no-print hover-action-bar select-none">
      {hasAddEntry && onAddEntry && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddEntry();
          }}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#00c598] hover:bg-[#00a37e] rounded-full transition-colors shadow-sm"
        >
          {entryLabel}
        </button>
      )}

      {customActions}

      {hasBullets && onToggleFormat && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFormat();
          }}
          title="Toggle Bullets"
          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
        >
          <List className="w-3.5 h-3.5" />
        </button>
      )}

      {onMoveUp && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          title="Move Section Up"
          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      )}

      {onMoveDown && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          title="Move Section Down"
          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      )}

      {onSwitchColumn && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSwitchColumn();
          }}
          title="Switch Column (Left / Right)"
          className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-full transition-colors"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
        </button>
      )}

      {onDeleteSection && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteSection();
          }}
          title="Delete Section"
          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}

      {hasSettings && onToggleSettings && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSettings();
          }}
          title="Section Settings"
          className="p-1 text-slate-600 hover:text-[#00c598] hover:bg-slate-100 rounded-full transition-colors"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
