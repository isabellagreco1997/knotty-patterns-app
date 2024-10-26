import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { PiPencil, PiTrash, PiCopy } from 'react-icons/pi';

function SavedPatterns() {
  const { user } = useAuthStore();
  const [patterns, setPatterns] = React.useState([
    {
      id: '1',
      name: 'Cozy Winter Hat',
      description: 'A warm and stylish winter hat with a simple pattern.',
      difficulty: 'beginner',
      rounds: 15,
      createdAt: '2024-02-10',
      previewImage: 'https://images.unsplash.com/photo-1612870466688-277d0f8f5082?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: '2',
      name: 'Granny Square Blanket',
      description: 'Traditional granny square pattern for a cozy blanket.',
      difficulty: 'intermediate',
      rounds: 24,
      createdAt: '2024-02-15',
      previewImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=300'
    }
  ]);

  const deletePattern = (id: string) => {
    if (confirm('Are you sure you want to delete this pattern?')) {
      setPatterns(patterns.filter(p => p.id !== id));
    }
  };

  const duplicatePattern = (id: string) => {
    const pattern = patterns.find(p => p.id === id);
    if (pattern) {
      const newPattern = {
        ...pattern,
        id: Date.now().toString(),
        name: `${pattern.name} (Copy)`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPatterns([...patterns, newPattern]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Patterns</h1>
          <Link
            to="/pattern-builder"
            className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700"
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

        <div className="grid md:grid-cols-2 gap-6">
          {patterns.map((pattern) => (
            <div key={pattern.id} className="border rounded-lg overflow-hidden">
              <img
                src={pattern.previewImage}
                alt={pattern.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{pattern.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{pattern.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Difficulty: {pattern.difficulty}</span>
                  <span>Rounds: {pattern.rounds}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Created: {pattern.createdAt}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => duplicatePattern(pattern.id)}
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
                      onClick={() => deletePattern(pattern.id)}
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
      </div>
    </div>
  );
}

export default SavedPatterns;