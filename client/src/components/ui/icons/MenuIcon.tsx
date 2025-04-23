import React from 'react';

interface IconProps {
  className?: string;
  fontSize?: 'small' | 'medium' | 'large';
}

const MenuIcon: React.FC<IconProps> = ({ className = '', fontSize = 'medium' }) => {
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

export default MenuIcon;
