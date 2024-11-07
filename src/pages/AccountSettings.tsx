import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useCustomer } from '../hooks/useCustomer';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { categorizeSubscriptions } from '../helpers/subscriptionHelpers';
import { PiSpinner, PiWarning, PiCreditCard, PiReceipt, PiClock, PiCalendar, PiSparkle } from 'react-icons/pi';
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

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 2
  }).format(amount / 100);
}

export default function AccountSettings() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { customer, paymentMethods, invoices, subscriptions, loading } = useCustomer();
  const { status: subscriptionStatus, loading: subscriptionLoading } = useSubscriptionStatus();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { current: currentSubscription, canceled: canceledSubscriptions } = 
    categorizeSubscriptions(subscriptions);

  const BILLING_PORTAL_URL = {
    development: 'https://billing.stripe.com/p/login/test_9AQdUsf6r1zvdsQbII',
    production: 'https://billing.stripe.com/p/login/aEU5nQ4AU89XfQsbII'
  };
    
  const handleManageSubscription = () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const portalUrl = isDevelopment ? BILLING_PORTAL_URL.development : BILLING_PORTAL_URL.production;
    window.open(portalUrl, '_blank');
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const { error: patternsError } = await supabase
        .from('patterns')
        .delete()
        .eq('user_id', user?.id);

      if (patternsError) throw patternsError;

      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user?.id);

      if (profileError) throw profileError;

      const { error: deleteError } = await supabase.auth.admin.deleteUser(user?.id || '');
      if (deleteError) throw deleteError;

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

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <PiSpinner className="w-6 h-6 animate-spin text-primary-600" />
          <span>Loading account settings...</span>
        </div>
      </div>
    );
  }

  const isPremium = subscriptionStatus === 'active';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-semibold">Account Settings</h1>
        </div>

        <div className="p-6 space-y-6">
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

          <div>
            <h2 className="text-lg font-medium mb-4">Subscription Status</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium text-lg">
                    {!currentSubscription && (
                      <span className="text-gray-600">Free Plan</span>
                    )}
                    {currentSubscription?.status === 'active' && (
                      <span className="text-green-600">Active Subscription</span>
                    )}
                    {currentSubscription?.status === 'trial' && (
                      <span className="text-blue-600">Trial Period</span>
                    )}
                    {currentSubscription?.status === 'canceling' && (
                      <span className="text-amber-600">Subscription Ending</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {currentSubscription?.message || 'No active subscription'}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleManageSubscription}
                    disabled={!isPremium}
                    className={`px-4 py-2 rounded-md ${
                      isPremium
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Manage Account
                  </button>
                  {!isPremium && (
                    <button
                      onClick={() => navigate('/pricing')}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
                    >
                      <PiSparkle className="w-4 h-4 mr-2" />
                      Upgrade to Premium
                    </button>
                  )}
                </div>
              </div>

              {currentSubscription && (
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <PiClock className="w-4 h-4 mr-2" />
                  {currentSubscription.daysRemaining} days remaining
                  {currentSubscription.status === 'active' && currentSubscription.renewsAt && (
                    <>
                      <PiCalendar className="w-4 h-4 ml-4 mr-2" />
                      Renews on {formatDate(currentSubscription.subscription.current_period_end)}
                    </>
                  )}
                  {currentSubscription.status === 'canceling' && currentSubscription.endsAt && (
                    <>
                      <PiCalendar className="w-4 h-4 ml-4 mr-2" />
                      Ends on {formatDate(currentSubscription.subscription.current_period_end)}
                    </>
                  )}
                </div>
              )}

              {canceledSubscriptions.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Previous Subscriptions</h3>
                  <div className="space-y-2">
                    {canceledSubscriptions.map((sub) => (
                      <div key={sub.id} className="text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Canceled
                          </span>
                          <span className="ml-2">
                            {formatDate(sub.current_period_start)} - {formatDate(sub.current_period_end)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">Payment Methods</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              {paymentMethods.length === 0 ? (
                <p className="text-gray-600">No payment methods on file</p>
              ) : (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center">
                      <PiCreditCard className="w-5 h-5 text-gray-500 mr-2" />
                      <span className="font-medium">{method.brand}</span>
                      <span className="ml-2">•••• {method.last4}</span>
                      <span className="ml-2 text-gray-500">
                        Expires {method.expMonth}/{method.expYear}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-4">Billing History</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              {invoices.length === 0 ? (
                <p className="text-gray-600">No billing history available</p>
              ) : (
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <PiReceipt className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="font-medium">
                          {formatCurrency(invoice.amount_paid, invoice.currency || 'USD')}
                        </span>
                        <span className="ml-2 text-gray-500">
                          {formatDate(invoice.created)}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

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