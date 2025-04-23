import { twMerge } from 'tailwind-merge';
import { SpinnerIcon } from './icons';

export interface CircularProgressProps {
  className?: string;
  size?: number | string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export const CircularProgress = ({
  className = '',
  size = 24,
  color = 'primary',
}: CircularProgressProps) => {
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  const colorClasses = {
    primary: 'text-blue-500',
    secondary: 'text-gray-500',
    error: 'text-red-500',
    info: 'text-cyan-500',
    success: 'text-green-500',
    warning: 'text-amber-500',
  }[color];

  return (
    <SpinnerIcon
      className={twMerge(`animate-spin ${colorClasses}`, className)}
      fontSize="medium"
      style={{ width: sizeValue, height: sizeValue }}
    />
  );
};
