import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';

export function useStripeWebhook() {
  const { user, updatePremiumStatus } = useAuthStore();
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    let intervalId: number;

    async function checkPaymentStatus() {
      if (!user?.email) return;

      try {
        // Use the correct base URL depending on the environment
        const baseUrl = isDevelopment ? 'http://localhost:8888' : '';
        const webhookUrl = `${baseUrl}/.netlify/functions/stripe-webhook`;

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'stripe-signature': 'internal-call'
          },
          body: JSON.stringify({
            type: 'checkout.session.completed',
            data: {
              object: {
                customer_details: {
                  email: user.email
                },
                customer: user.id
              }
            }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Webhook check failed: ${errorText}`);
        }

        const data = await response.json();
        console.log('Webhook check response:', data);

        // Update premium status if needed
        if (data.received && user.isPremium !== data.hasPurchasedTargetProduct) {
          await updatePremiumStatus(data.hasPurchasedTargetProduct);
        }
      } catch (error) {
        console.error('Error in webhook check:', error);
      }
    }

    // Run immediately and then every 30 seconds
    checkPaymentStatus();
    intervalId = window.setInterval(checkPaymentStatus, 30000);

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [user, updatePremiumStatus, isDevelopment]);
}