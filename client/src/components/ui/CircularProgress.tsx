import { twMerge } from 'tailwind-merge';

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
    <svg
      className={twMerge(`animate-spin ${colorClasses}`, className)}
      style={{ width: sizeValue, height: sizeValue }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-label="loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
