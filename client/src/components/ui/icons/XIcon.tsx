import React from 'react';

interface IconProps {
  className?: string;
  fontSize?: 'small' | 'medium' | 'large';
}

const XIcon: React.FC<IconProps> = ({ className = '', fontSize = 'medium' }) => {
  const sizeMap = {
    small: 20,
    medium: 24,
    large: 32,
  };

  const size = sizeMap[fontSize];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

export default XIcon;
