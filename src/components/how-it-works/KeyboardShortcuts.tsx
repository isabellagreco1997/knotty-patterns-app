import React from 'react';

const shortcuts = [
  { key: '⌘ + Z', description: 'Undo last action' },
  { key: '⌘ + Shift + Z', description: 'Redo last action' },
  { key: '⌘ + S', description: 'Save pattern' },
  { key: '⌘ + D', description: 'Duplicate selected stitch' },
  { key: 'Delete', description: 'Remove selected stitch' },
  { key: 'Enter', description: 'Save text changes' },
  { key: 'Escape', description: 'Cancel editing' },
];

export default function KeyboardShortcuts() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h3 className="text-2xl font-bold mb-6">Keyboard Shortcuts</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center space-x-4">
            <kbd className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md font-mono text-sm">
              {shortcut.key}
            </kbd>
            <span className="text-gray-600">{shortcut.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}