import React from 'react';
import { Link } from 'react-router-dom';
import { PiCaretRight } from 'react-icons/pi';

interface BreadcrumbsProps {
  pattern?: {
    name: string;
    category: string;
  };
}

export default function Breadcrumbs({ pattern }: BreadcrumbsProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 mb-8">
        <li>
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
        </li>
        <PiCaretRight className="w-4 h-4 text-gray-400" />
        <li>
          <Link to="/free-patterns" className="text-gray-500 hover:text-gray-700">
            Free Crochet Patterns
          </Link>
        </li>
        {pattern && (
          <>
            <PiCaretRight className="w-4 h-4 text-gray-400" />
            <li>
              <span className="text-gray-900" aria-current="page">
                {pattern.name}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
