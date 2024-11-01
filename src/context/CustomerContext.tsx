// CustomerContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getCustomerDetails } from '../lib/stripe';

interface Customer {
  id: string;
  email: string | null;
  name: string | null;
  phone: string | null;
  address: {
    city?: string | null;
    country?: string | null;
    line1?: string | null;
    line2?: string | null;
    postal_code?: string | null;
    state?: string | null;
  } | null;
  created: number;
  currency: string | null;
  delinquent: boolean | null;
  description: string | null;
  discount: any; // Adjust based on actual type
  preferred_locales: string[];
}

interface PaymentMethod {
  id: string;
  brand: string | null;
  last4: string | null;
  expMonth: number | null;
  expYear: number | null;
}

interface Invoice {
  id: string;
  number: string | null;
  amount_paid: number;
  status: string | null;
  created: number;
  due_date: number | null;
  currency: string | null;
}

interface UpcomingInvoice {
  amount_due: number;
  currency: string;
  due_date: number | null;
}

interface Subscription {
  id: string;
  status: string;
  current_period_end: number;
  current_period_start: number;
  cancel_at_period_end: boolean;
  canceled_at: number | null;
  trial_end: number | null;
  trial_start: number | null;
}

interface CustomerData {
  customer: Customer;
  paymentMethods: PaymentMethod[];
  invoices: Invoice[];
  upcomingInvoice: UpcomingInvoice | null;
  subscriptions: Subscription[];
}

interface CustomerContextType {
  customerData: CustomerData | null;
  loading: boolean;
  error: string | null;
}

export const CustomerContext = createContext<CustomerContextType>({
  customerData: null,
  loading: true,
  error: null,
});

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({ children }) => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: CustomerData = await getCustomerDetails();
        setCustomerData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to fetch customer details');
        } else {
          setError('Failed to fetch customer details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CustomerContext.Provider value={{ customerData, loading, error }}>

      {children}
    </CustomerContext.Provider>
  );
};
