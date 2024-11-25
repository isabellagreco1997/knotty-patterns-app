import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiWarning, PiSpinner, PiPencilSimple, PiTrash } from 'react-icons/pi';
import { useAuthStore } from '../stores/useAuthStore';
import { supabase } from '../lib/supabase';
import SEOHead from '../components/SEOHead';

interface GeneratedPattern {
  id: string;
  prompt: string;
  image_url: string;
  raw_pattern: string;
  created_at: string;
}

export default function GeneratedPatterns() {
  const [patterns, setPatterns] = useState<GeneratedPattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/generated-patterns');
      return;
    }

    async function fetchPatterns() {
      try {
        const { data, error } = await supabase
          .from('generated_patterns')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPatterns(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load patterns');
      } finally {
        setLoading(false);
      }
    }

    fetchPatterns();
  }, [user, navigate]);

  const handleTestPattern = (pattern: GeneratedPattern) => {
    // Store pattern in localStorage for pattern builder
    localStorage.setItem('test_pattern', JSON.stringify({
      prompt: pattern.prompt,
      pattern: pattern.raw_pattern,
      imageUrl: pattern.image_url
    }));
    navigate('/pattern-builder');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pattern?')) return;

    try {
      const { error } = await supabase
        .from('generated_patterns')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPatterns(patterns.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete pattern');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PiSpinner className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="AI Generated Patterns"
        description="View and manage your AI-generated crochet patterns. Test and refine patterns before use."
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Generated Patterns</h1>
            <p className="text-xl text-gray-600">Manage your AI-generated crochet patterns</p>
          </div>

          {/* Important Notice */}
          <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start">
              <PiWarning className="w-6 h-6 text-amber-600 mt-1 mr-4 flex-shrink-0" />
              <div className="text-amber-800">
                <h2 className="text-lg font-semibold mb-2">Important Notice:</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>AI-generated patterns require thorough human testing before use</li>
                  <li>Use the pattern builder to test and refine these patterns</li>
                  <li>Never distribute or sell untested patterns</li>
                  <li>Consider these patterns as starting points, not final designs</li>
                </ul>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl">
              {error}
            </div>
          )}

          {patterns.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">You haven't generated any patterns yet.</p>
              <button
                onClick={() => navigate('/get-inspiration')}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Get Started with AI Generation
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {patterns.map((pattern) => (
                <div key={pattern.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={pattern.image_url}
                      alt={pattern.prompt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{pattern.prompt}</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Created on {new Date(pattern.created_at).toLocaleDateString()}
                    </p>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                          {pattern.raw_pattern.slice(0, 200)}...
                        </pre>
                      </div>
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => handleTestPattern(pattern)}
                          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                          <PiPencilSimple className="w-4 h-4 mr-2" />
                          Test Pattern
                        </button>
                        <button
                          onClick={() => handleDelete(pattern.id)}
                          className="inline-flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <PiTrash className="w-4 h-4 mr-2" />
                          Delete
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
    </>
  );
}