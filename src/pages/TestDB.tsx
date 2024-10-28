import React, { useEffect, useState } from 'react';
import { testDatabase } from '../lib/test-db';

export default function TestDB() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Testing database connection...');

  useEffect(() => {
    async function runTest() {
      try {
        const result = await testDatabase();
        if (result) {
          setStatus('success');
          setMessage('Database connection successful! All operations working.');
        } else {
          setStatus('error');
          setMessage('Database test failed. Check console for details.');
        }
      } catch (error) {
        setStatus('error');
        setMessage(`Database test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    runTest();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
        
        <div className={`p-4 rounded-md ${
          status === 'loading' ? 'bg-blue-50 text-blue-700' :
          status === 'success' ? 'bg-green-50 text-green-700' :
          'bg-red-50 text-red-700'
        }`}>
          <div className="flex items-center">
            {status === 'loading' && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
            )}
            {message}
          </div>
        </div>

        {status === 'error' && (
          <p className="mt-4 text-sm text-gray-600">
            Please check:
            <ul className="list-disc ml-5 mt-2">
              <li>Your Supabase URL and anon key in .env</li>
              <li>Database tables are created correctly</li>
              <li>RLS policies are in place</li>
              <li>Browser console for detailed error messages</li>
            </ul>
          </p>
        )}
      </div>
    </div>
  );
}