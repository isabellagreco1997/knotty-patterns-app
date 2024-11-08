import React, { useState } from 'react';

interface CustomTextInputProps {
  onAddText: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ onAddText }) => {
  const [customText, setCustomText] = useState('');

  const handleAddText = () => {
    if (customText.trim()) {
      onAddText(customText.trim());
      setCustomText('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold">Add custom text</h2>
        <div className="mb-8">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                This will create a new line but it won't be counted as a round
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter notes, comments, or instructions..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              onClick={handleAddText}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Add Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTextInput;
