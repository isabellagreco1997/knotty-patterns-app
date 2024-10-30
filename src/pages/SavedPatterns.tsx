import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { usePatternStore } from '../stores/usePatternStore';
import { PiPencil, PiTrash, PiCopy, PiSpinner, PiCaretDown, PiCaretUp } from 'react-icons/pi';
import type { Pattern } from '../types/pattern';

function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function PatternCard({ pattern, onDelete, onDuplicate }: { 
  pattern: Pattern; 
  onDelete: (id: string) => void;
  onDuplicate: (pattern: Pattern) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-2">{pattern.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{pattern.description}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {isExpanded ? (
              <PiCaretUp className="w-5 h-5" />
            ) : (
              <PiCaretDown className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Difficulty: {pattern.difficulty}</span>
          <span>Sections: {pattern.sections.length}</span>
        </div>

        {isExpanded && (
          <div className="mt-4 border-t pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700">Hook Size</p>
                <p className="text-gray-600">{pattern.hookSize}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Yarn Weight</p>
                <p className="text-gray-600">{pattern.yarnWeight}</p>
              </div>
            </div>

            {pattern.sections.map((section, index) => (
              <div key={section.id} className="mt-4">
                <h4 className="font-medium text-gray-700">{section.name}</h4>
                <p className="text-sm text-gray-600">
                  {section.rounds.length} rounds
                </p>
              </div>
            ))}

            {pattern.notes && pattern.notes.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-700">Notes</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {pattern.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Created: {formatDate(pattern.createdAt)}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => onDuplicate(pattern)}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Duplicate Pattern"
            >
              <PiCopy className="w-5 h-5" />
            </button>
            <Link
              to={`/pattern-builder/${pattern.id}`}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Edit Pattern"
            >
              <PiPencil className="w-5 h-5" />
            </Link>
            <button
              onClick={() => onDelete(pattern.id)}
              className="p-2 hover:bg-gray-100 rounded-full text-red-600"
              title="Delete Pattern"
            >
              <PiTrash className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedPatterns() {
  const { user } = useAuthStore();
  const { patterns, loading, error, fetchPatterns, deletePattern, duplicatePattern } = usePatternStore();

  useEffect(() => {
    if (user) {
      fetchPatterns(user.id);
    }
  }, [user, fetchPatterns]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this pattern?')) {
      try {
        await deletePattern(id);
      } catch (error) {
        console.error('Error deleting pattern:', error);
        alert('Failed to delete pattern. Please try again.');
      }
    }
  };

  const handleDuplicate = async (pattern: Pattern) => {
    if (!user) return;
    
    try {
      await duplicatePattern(pattern, user.id, user.isPremium);
    } catch (error) {
      console.error('Error duplicating pattern:', error);
      alert(error instanceof Error ? error.message : 'Failed to duplicate pattern. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2 text-primary-600">
          <PiSpinner className="w-6 h-6 animate-spin" />
          <span>Loading patterns...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Error loading patterns: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Patterns</h1>
          <Link
            to="/pattern-builder"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Create New Pattern
          </Link>
        </div>

        {!user?.isPremium && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-800">
              Free account: You can save up to 5 patterns. Upgrade to Premium for unlimited patterns!
            </p>
          </div>
        )}

        {patterns.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">You haven't created any patterns yet.</p>
            <Link
              to="/pattern-builder"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Create Your First Pattern
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {patterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedPatterns;