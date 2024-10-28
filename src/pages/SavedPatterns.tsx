import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { usePatternStore } from '../stores/usePatternStore';
import { PiPencil, PiTrash, PiCopy, PiSpinner } from 'react-icons/pi';

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

  const handleDuplicate = async (pattern: any) => {
    if (!user) return;
    
    try {
      await duplicatePattern(pattern, user.id);
    } catch (error) {
      console.error('Error duplicating pattern:', error);
      alert('Failed to duplicate pattern. Please try again.');
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
          <div className="grid md:grid-cols-2 gap-6">
            {patterns.map((pattern) => (
              <div key={pattern.id} className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{pattern.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{pattern.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Difficulty: {pattern.difficulty}</span>
                    <span>Sections: {pattern.sections.length}</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Created: {new Date(pattern.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDuplicate(pattern)}
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
                        onClick={() => handleDelete(pattern.id)}
                        className="p-2 hover:bg-gray-100 rounded-full text-red-600"
                        title="Delete Pattern"
                      >
                        <PiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedPatterns;