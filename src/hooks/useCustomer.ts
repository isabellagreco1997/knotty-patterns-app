import { useEffect } from 'react';
import { useCustomerStore } from '../stores/useCustomerStore';
import { useAuthStore } from '../stores/useAuthStore';

export function useCustomer() {
  const { user } = useAuthStore();
  const { 
    customer,
    paymentMethods,
    invoices,
    subscriptions,
    loading,
    error,
    fetchCustomerData,
    clearCustomerData
  } = useCustomerStore();

  useEffect(() => {
    if (user) {
      fetchCustomerData();
    } else {
      clearCustomerData();
    }
  }, [user, fetchCustomerData, clearCustomerData]);

  return {
    customer,
    paymentMethods,
    invoices,
    subscriptions,
    loading,
    error,
    refetch: fetchCustomerData
  };
}