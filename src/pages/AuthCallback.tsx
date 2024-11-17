import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PiSpinner } from 'react-icons/pi';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          // Check if profile exists
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (!profile) {
            // Create profile if it doesn't exist
            await supabase.from('profiles').insert([
              {
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata.full_name || session.user.email?.split('@')[0],
                is_premium: false
              }
            ]);
          }

          navigate('/pattern-builder');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <PiSpinner className="w-8 h-8 animate-spin text-primary-600" />
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}