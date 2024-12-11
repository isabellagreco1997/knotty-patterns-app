import React from 'react';
import PatternCard from './PatternCard';
import PromoCard from './PromoCard';
import type { FreePattern } from '../../types/freePattern';

interface PatternGridProps {
  patterns: FreePattern[];
  showPromo?: boolean;
}

export default function PatternGrid({ patterns, showPromo = true }: PatternGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {showPromo && <PromoCard />}
      {patterns.map((pattern) => (
        <PatternCard key={pattern.id} pattern={pattern} />
      ))}
    </div>
  );
}
