import { create } from 'zustand';
import { getCustomerDetails } from '../lib/stripe';

interface PaymentMethod {
  id: string;
  brand: string | null;
  last4: string | null;
  expMonth: number | null;
  expYear: number | null;
}

export interface Invoice {
  id: string;
  number: string | null;
  amount_paid: number;
  status: string | null;
  created: number;
  due_date: number | null;
  currency: string | null;
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
  discount: any;
  preferred_locales: string[];
}

interface CustomerData {
  customer: Customer | null;
  paymentMethods: PaymentMethod[];
  invoices: Invoice[];
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
}

interface CustomerStore extends CustomerData {
  fetchCustomerData: () => Promise<void>;
  clearCustomerData: () => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customer: null,
  paymentMethods: [],
  invoices: [],
  subscriptions: [],
  loading: false,
  error: null,

  fetchCustomerData: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getCustomerDetails();
      set({
        customer: data.customer,
        paymentMethods: data.paymentMethods,
        invoices: data.invoices,
        subscriptions: data.subscriptions,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch customer details',
        loading: false,
      });
    }
  },

  clearCustomerData: () => {
    set({
      customer: null,
      paymentMethods: [],
      invoices: [],
      subscriptions: [],
      loading: false,
      error: null,
    });
  },
}));