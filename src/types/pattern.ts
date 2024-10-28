import { ReactNode } from 'react';

export interface Stitch {
  id: string;
  type: string;
  count: number;
  note?: any;
}

export interface Round {
  id: string;
  headerNote?: string;
  footerNote?: string;
  stitches: Stitch[];
  notes?: string;
  isText?: boolean;
  isRepeating?: boolean;
  repeatCount?: number;
}

export interface PatternSection {
  id: string;
  name: string;
  rounds: Round[];
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
  sections: PatternSection[];
  notes: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}