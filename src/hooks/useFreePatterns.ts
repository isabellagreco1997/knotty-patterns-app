import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { FreePattern, FreePatternFilters } from '../types/freePattern';

export function useFreePatterns(filters: FreePatternFilters = {}) {
  const [patterns, setPatterns] = useState<FreePattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchPatterns() {
      try {
        let query = supabase
          .from('freepatterns')
          .select('*', { count: 'exact' })
          .eq('approved', true);

        if (filters.category) {
          query = query.eq('category', filters.category);
        }

        if (filters.subcategory) {
          query = query.eq('subcategory', filters.subcategory);
        }

        if (filters.difficulty) {
          query = query.eq('difficulty', filters.difficulty);
        }

        if (filters.searchTerm) {
          query = query.or(
            `name.ilike.%${filters.searchTerm}%,` +
            `description.ilike.%${filters.searchTerm}%,` +
            `keywords.cs.{${filters.searchTerm}}`
          );
        }

        if (filters.sortBy) {
          query = query.order(filters.sortBy, {
            ascending: filters.sortOrder === 'asc'
          });
        } else {
          query = query.order('last_updated', { ascending: false });
        }

        const { data, error: fetchError, count } = await query;

        if (fetchError) throw fetchError;

        setPatterns(data || []);
        if (count !== null) setTotalCount(count);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch patterns');
      } finally {
        setLoading(false);
      }
    }

    fetchPatterns();
  }, [
    filters.category,
    filters.subcategory,
    filters.difficulty,
    filters.searchTerm,
    filters.sortBy,
    filters.sortOrder
  ]);

  return { patterns, loading, error, totalCount };
}