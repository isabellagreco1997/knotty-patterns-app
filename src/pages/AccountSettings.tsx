import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useSubscription } from '../hooks/useSubscription';
import { PiSpinner, PiWarning } from 'react-icons/pi';
import { supabase } from '../lib/supabase';
import { createPortalSession } from '../lib/stripe';

function DeleteAccountModal({ isOpen, onClose, onConfirm }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-center text-red-600 mb-4">
          <PiWarning className="w-12 h-12" />
        </div>
        <h3 className="text-xl font-semibold text-center mb-4">Delete Account</h3>
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to delete your account? This action cannot be undone and all your patterns will be permanently deleted.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AccountSettings() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { isActive, plan, isLoading } = useSubscription();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleManageSubscription = async () => {
    try {
      await createPortalSession();
    } catch (error) {
      console.error('Error opening subscription portal:', error);
      alert('Failed to open subscription management. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Delete user's patterns
      const { error: patternsError } = await supabase
        .from('patterns')
        .delete()
        .eq('user_id', user?.id);

      if (patternsError) throw patternsError;

      // Delete user's profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user?.id);

      if (profileError) throw profileError;

      // Delete user account
      const { error: deleteError } = await supabase.auth.admin.deleteUser(user?.id || '');
      if (deleteError) throw deleteError;

      // Sign out and redirect
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <PiSpinner className="w-6 h-6 animate-spin text-primary-600" />
          <span>Loading account settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold">Account Settings</h1>
        </div>

        <div className="p-6 space-y-6">
          {/* Account Information */}
          <div>
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <div className="font-medium">{user?.email}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Member Since</label>
                  <div className="font-medium">
                    {new Date(user?.createdAt || '').toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Information */}
          <div>
            <h2 className="text-lg font-medium mb-4">Subscription</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">
                    Current Plan: {plan.charAt(0).toUpperCase() + plan.slice(1)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Status: {isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
                {(isActive || plan !== 'free') && (
                  <button
                    onClick={handleManageSubscription}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Manage Subscription
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h2 className="text-lg font-medium mb-4 text-red-600">Danger Zone</h2>
            <div className="bg-red-50 p-4 rounded-md border border-red-200">
              <p className="text-sm text-red-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <span className="flex items-center">
                    <PiSpinner className="w-4 h-4 animate-spin mr-2" />
                    Deleting Account...
                  </span>
                ) : (
                  'Delete Account'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}