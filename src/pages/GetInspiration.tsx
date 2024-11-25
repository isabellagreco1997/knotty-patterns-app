import React, { useState, useEffect } from 'react';
import { PiSpinner, PiRobot, PiMagicWand, PiPencilSimple, PiCheck, PiWarning, PiSparkle } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useAuthStore } from '../stores/useAuthStore';
import { useAIStore } from '../stores/useAIStore';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { supabase } from '../lib/supabase';

const FREE_GENERATIONS_LIMIT = 3;

export default function GetInspiration() {
  const { lastPrompt, lastGeneratedImage, lastGeneratedPattern, setLastGenerated } = useAIStore();
  const [prompt, setPrompt] = useState(lastPrompt);
  const [generatedImage, setGeneratedImage] = useState<string | null>(lastGeneratedImage);
  const [generatedPattern, setGeneratedPattern] = useState<string | null>(lastGeneratedPattern);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPattern, setIsGeneratingPattern] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationsLeft, setGenerationsLeft] = useState<number | null>(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { status: subscriptionStatus } = useSubscriptionStatus();
  const isPremium = subscriptionStatus === 'active';

  useEffect(() => {
    if (user) {
      checkGenerationsLeft();
    }
  }, [user]);

  const checkGenerationsLeft = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('ai_generations_count')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      const usedGenerations = data?.ai_generations_count || 0;
      setGenerationsLeft(FREE_GENERATIONS_LIMIT - usedGenerations);
    } catch (error) {
      console.error('Error checking generations:', error);
    }
  };

  const incrementGenerationCount = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          ai_generations_count: (generationsLeft !== null ? FREE_GENERATIONS_LIMIT - generationsLeft + 1 : 1) 
        })
        .eq('id', user.id);

      if (error) throw error;
      
      await checkGenerationsLeft();
    } catch (error) {
      console.error('Error updating generation count:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (!isPremium && generationsLeft !== null && generationsLeft <= 0) {
      setError('You have reached your free generations limit. Upgrade to Premium for unlimited generations!');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setGeneratedPattern(null);

    try {
      const response = await fetch('/.netlify/functions/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: `amigurumi crochet ${prompt}, cute, detailed, high quality` }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      setLastGenerated(prompt, data.imageUrl, null);

      if (!isPremium) {
        await incrementGenerationCount();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePattern = async () => {
    if (!prompt || !generatedImage) return;

    if (!user) {
      navigate('/login?redirect=/get-inspiration');
      return;
    }

    setIsGeneratingPattern(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/generate-pattern', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          imageUrl: generatedImage,
          userId: user.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate pattern');
      }

      const { pattern } = await response.json();
      setGeneratedPattern(pattern);
      setLastGenerated(prompt, generatedImage, pattern);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate pattern');
    } finally {
      setIsGeneratingPattern(false);
    }
  };

  const handleSavePattern = async () => {
    if (!user || !generatedPattern || !generatedImage) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/save-pattern', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          prompt,
          imageUrl: generatedImage,
          pattern: generatedPattern
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save pattern');
      }

      alert('Pattern saved successfully! You can now find it in your generated patterns.');
      
      setPrompt('');
      setGeneratedImage(null);
      setGeneratedPattern(null);
      setLastGenerated('', null, null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save pattern');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Get AI Inspiration - Generate Crochet Ideas"
        description="Generate unique crochet and amigurumi design ideas using AI. Get inspired for your next project with our AI-powered image generator."
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get AI Inspiration
            </h1>
            <p className="text-xl text-gray-600">
              Generate unique crochet and amigurumi designs using AI
            </p>
          </div>

          {/* Important Disclaimer */}
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start">
              <PiWarning className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Important Notice:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>AI-generated patterns are for inspiration only and require human testing</li>
                  <li>Always test and verify patterns thoroughly before use or distribution</li>
                  <li>Use the pattern builder to refine and validate the generated pattern</li>
                  <li>Only sell patterns that have been thoroughly tested by a human crocheter</li>
                </ul>
              </div>
            </div>
          </div>

          {!isPremium && generationsLeft !== null && (
            <div className="mb-8 p-4 bg-primary-50 border border-primary-200 rounded-xl">
              <div className="flex items-start">
                <PiSparkle className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-primary-800 font-medium">
                    Free Account: {generationsLeft} generations remaining
                  </p>
                  <p className="text-sm text-primary-600 mt-1">
                    Upgrade to Premium for unlimited generations and access to all features!
                  </p>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg mt-3 hover:bg-primary-700 transition-colors text-sm"
                  >
                    View Premium Features
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your crochet idea
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., a cute baby elephant with a flower crown"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pl-12"
                  />
                  <PiRobot className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <PiSpinner className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <PiMagicWand className="w-5 h-5 mr-2" />
                    Generate Design
                  </>
                )}
              </button>
            </form>

            {generatedImage && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Generated Design</h2>
                <div className="relative rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={generatedImage}
                    alt={prompt}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <a
                      href={generatedImage}
                      download="crochet-inspiration.png"
                      className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors"
                    >
                      Download Image
                    </a>
                    {!generatedPattern && (
                      <button
                        onClick={handleCreatePattern}
                        disabled={isGeneratingPattern}
                        className="inline-flex items-center px-4 py-2 bg-primary-600/90 backdrop-blur-sm text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGeneratingPattern ? (
                          <>
                            <PiSpinner className="w-4 h-4 mr-2 animate-spin" />
                            Creating Pattern...
                          </>
                        ) : (
                          <>
                            <PiPencilSimple className="w-4 h-4 mr-2" />
                            Create Pattern
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {generatedPattern && (
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Generated Pattern</h3>
                      <button
                        onClick={handleSavePattern}
                        disabled={isSaving}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <>
                            <PiSpinner className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <PiCheck className="w-4 h-4 mr-2" />
                            Save Pattern
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 whitespace-pre-wrap font-mono text-sm">
                      {generatedPattern}
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                      Click "Save Pattern" to store this pattern in your generated patterns collection.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              Images and patterns are generated using AI and require human testing before use.
              <br />
              Always verify and refine patterns before sharing or selling.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}