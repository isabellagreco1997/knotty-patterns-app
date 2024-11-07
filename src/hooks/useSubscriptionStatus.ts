// useSubscriptionStatus.ts
import { useState, useEffect } from 'react';
import { getUserSubscriptionStatus } from '../helpers/hasActiveSubscriptions'; // Adjust the import based on your file structure

const useSubscriptionStatus = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchStatus = async () => {
      const status = await getUserSubscriptionStatus();
      setSubscriptionStatus(status);
    };
console.log('aqui')
    fetchStatus();
  }, []);

  return subscriptionStatus;
};

export default useSubscriptionStatus;
