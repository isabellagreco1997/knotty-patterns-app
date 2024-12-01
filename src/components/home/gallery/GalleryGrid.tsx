import React from 'react';
import { GalleryItem } from '../../../types/gallery';
import GalleryCard from './GalleryCard';

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
      {items.map((item, index) => (
        <div key={index} className="break-inside-avoid mb-4">
          <GalleryCard item={item} index={index} />
        </div>
      ))}
    </div>
  );
}