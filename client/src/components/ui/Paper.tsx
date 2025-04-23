import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface PaperProps {
  children: ReactNode;
  className?: string;
  elevation?: number;
}

export const Paper = ({ children, className = '', elevation = 1 }: PaperProps) => {
  const elevationClasses =
    {
      0: 'shadow-none',
      1: 'shadow-sm',
      2: 'shadow',
      3: 'shadow-md',
      4: 'shadow-lg',
      5: 'shadow-xl',
    }[Math.min(5, Math.max(0, elevation))] || 'shadow';

  return (
    <div className={twMerge(`bg-white rounded-lg p-4 ${elevationClasses}`, className)}>
      {children}
    </div>
  );
};
