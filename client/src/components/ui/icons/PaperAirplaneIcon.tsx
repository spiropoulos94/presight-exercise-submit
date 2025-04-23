import React from 'react';

interface IconProps {
  className?: string;
  fontSize?: 'small' | 'medium' | 'large';
}

const PaperAirplaneIcon: React.FC<IconProps> = ({ className = '', fontSize = 'medium' }) => {
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
      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
  );
};

export default PaperAirplaneIcon;
