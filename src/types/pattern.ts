import { ReactNode } from 'react';

export interface Stitch {
  id: string;
  type: string;
  count: number;
  note?: string;
}

export interface Round {
  id: string;
  headerNote?: string;
  footerNote?: string;
  stitches: Stitch[];
  notes?: string;
}

export interface Pattern {
  id?: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  hookSize: string;
  yarnWeight: string;
  gauge?: string;
  materials?: string[];
  rounds: Round[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}