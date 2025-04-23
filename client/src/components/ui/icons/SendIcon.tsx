import React from 'react';

interface IconProps {
  className?: string;
  fontSize?: 'small' | 'medium' | 'large';
}

const SendIcon: React.FC<IconProps> = ({ className = '', fontSize = 'medium' }) => {
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
      fill="currentColor"
      className={className}
    >
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
};

export default SendIcon;
