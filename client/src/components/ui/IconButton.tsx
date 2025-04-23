import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  color?: 'default' | 'primary' | 'secondary' | 'error';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className = '',
      color = 'default',
      disabled = false,
      size = 'medium',
      onClick,
      ...props
    },
    ref,
  ) => {
    const colorClasses = {
      default: 'text-gray-500 hover:bg-gray-100',
      primary: 'text-blue-500 hover:bg-blue-50',
      secondary: 'text-gray-700 hover:bg-gray-100',
      error: 'text-red-500 hover:bg-red-50',
    }[color];

    const sizeClasses = {
      small: 'p-1 text-sm',
      medium: 'p-2',
      large: 'p-3 text-lg',
    }[size];

    return (
      <button
        ref={ref}
        type="button"
        className={twMerge(
          'rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2',
          colorClasses,
          sizeClasses,
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className,
        )}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
