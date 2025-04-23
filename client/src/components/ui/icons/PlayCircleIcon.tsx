import React from 'react';

interface IconProps {
  className?: string;
  fontSize?: 'small' | 'medium' | 'large';
}

const PlayCircleIcon: React.FC<IconProps> = ({ className = '', fontSize = 'medium' }) => {
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
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default PlayCircleIcon;
