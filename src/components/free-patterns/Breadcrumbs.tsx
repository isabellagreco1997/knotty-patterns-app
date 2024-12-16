import React from 'react';
import { Link } from 'react-router-dom';
import { PiCaretRight, PiHouse } from 'react-icons/pi';
import type { NavigationItem } from '../../utils/navigation';

interface BreadcrumbsProps {
  items: NavigationItem[];
  pattern?: {
    name: string;
    category: string;
  };
}

export default function Breadcrumbs({ items, pattern }: BreadcrumbsProps) {
  const allItems = [...items];
  
  // Add pattern-specific items if provided
  if (pattern) {
    if (pattern.category) {
      allItems.push({
        label: pattern.category,
        path: `/categories/${pattern.category.toLowerCase()}`
      });
    }
    allItems.push({
      label: pattern.name,
      path: ''
    });
  }

  return (
    <nav className="flex items-center" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 mb-8">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <PiCaretRight className="w-4 h-4 text-gray-400 mx-2" />}
            {index === allItems.length - 1 ? (
              <span className="text-gray-900 font-medium">{item.label}</span>
            ) : (
              <Link 
                to={item.path}
                className="text-gray-500 hover:text-gray-700 hover:underline flex items-center"
              >
                {index === 0 && <PiHouse className="w-4 h-4 mr-1" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}