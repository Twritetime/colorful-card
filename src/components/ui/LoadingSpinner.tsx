import React from 'react';

export default function LoadingSpinner({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  let dimensions;
  
  switch (size) {
    case 'small':
      dimensions = 'w-4 h-4 border-2';
      break;
    case 'large':
      dimensions = 'w-10 h-10 border-4';
      break;
    case 'medium':
    default:
      dimensions = 'w-6 h-6 border-3';
      break;
  }
  
  return (
    <div className={`spinner-border animate-spin inline-block ${dimensions} rounded-full border-t-transparent border-blue-600`}>
      <span className="sr-only">Loading...</span>
    </div>
  );
} 