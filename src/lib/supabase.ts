import { createClient } from '@supabase/supabase-js';
import type { Pattern } from '../types/pattern';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function savePattern(pattern: Pattern) {
  const { data, error } = await supabase
    .from('patterns')
    .upsert({
      id: pattern.id,
      name: pattern.name,
      description: pattern.description,
      difficulty: pattern.difficulty,
      hook_size: pattern.hookSize,
      yarn_weight: pattern.yarnWeight,
      gauge: pattern.gauge,
      materials: pattern.materials,
      sections: pattern.sections,
      notes: pattern.notes,
      user_id: pattern.userId,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPattern(id: string) {
  const { data, error } = await supabase
    .from('patterns')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserPatterns(userId: string) {
  const { data, error } = await supabase
    .from('patterns')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deletePattern(id: string) {
  const { error } = await supabase
    .from('patterns')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function duplicatePattern(id: string, userId: string) {
  const pattern = await getPattern(id);
  if (!pattern) throw new Error('Pattern not found');

  const newPattern = {
    ...pattern,
    id: undefined,
    name: `${pattern.name} (Copy)`,
    user_id: userId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('patterns')
    .insert([newPattern])
    .select()
    .single();

  if (error) throw error;
  return data;
}