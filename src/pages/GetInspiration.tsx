import React, { useState, useEffect } from 'react';
import { PiSpinner, PiRobot, PiMagicWand, PiPencilSimple, PiCheck, PiWarning, PiSparkle } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useAuthStore } from '../stores/useAuthStore';
import { useAIStore } from '../stores/useAIStore';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { supabase } from '../lib/supabase';
import { GeneratedDesign } from '../components/inspiration/GeneratedDesign';
import { PromptForm } from '../components/inspiration/PromptForm';
import { FreeAccountNotice } from '../components/inspiration/FreeAccountNotice';
import { Disclaimer } from '../components/inspiration/Disclaimer';
import { Header } from '../components/inspiration/Header';
import { GeneratedPattern } from '../components/inspiration/GeneratedPattern';

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
          pattern: generatedPattern,
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
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Header />
        <Disclaimer />
        {!isPremium && generationsLeft !== null && (
          <FreeAccountNotice generationsLeft={generationsLeft} />
        )}
        <PromptForm
          prompt={prompt}
          isLoading={isLoading}
          setPrompt={setPrompt}
          handleSubmit={handleSubmit}
          error={error}
        />
        {generatedImage && (
          <GeneratedDesign
            generatedImage={generatedImage}
            prompt={prompt}
            isGeneratingPattern={isGeneratingPattern}
            handleCreatePattern={handleCreatePattern}
          />
        )}
        {generatedPattern && (
          <GeneratedPattern
            generatedPattern={generatedPattern}
            isSaving={isSaving}
            handleSavePattern={handleSavePattern}
          />
        )}
      </div>
    </div>
  );
}