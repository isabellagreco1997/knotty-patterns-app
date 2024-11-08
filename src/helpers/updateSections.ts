// helpers/updateSections.ts

import { Pattern, PatternSection } from '../types/pattern';
import React from 'react';

export const updateSections = (
  setPattern: React.Dispatch<React.SetStateAction<Pattern>>,
  sections: PatternSection[]
) => {
  setPattern((prevPattern) => ({
    ...prevPattern,
    sections,
    updatedAt: new Date(),
  }));
};
