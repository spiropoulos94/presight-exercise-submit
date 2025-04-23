import { ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  component?: ElementType;
  variant?: Variant;
  color?: 'default' | 'primary' | 'secondary' | 'error';
  gutterBottom?: boolean;
}

export const Typography = ({
  children,
  className = '',
  component,
  variant = 'body1',
  color = 'default',
  gutterBottom = false,
}: TypographyProps) => {
  const variantClasses = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
    subtitle1: 'text-base font-medium',
    subtitle2: 'text-sm font-medium',
    body1: 'text-base',
    body2: 'text-sm',
  };

  const colorClasses = {
    default: 'text-gray-900',
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    error: 'text-red-600',
  };

  const Component =
    component ||
    ({
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      subtitle1: 'h6',
      subtitle2: 'h6',
      body1: 'p',
      body2: 'p',
    }[variant] as ElementType);

  return (
    <Component
      className={twMerge(
        variantClasses[variant],
        colorClasses[color],
        gutterBottom ? 'mb-2' : '',
        className,
      )}
    >
      {children}
    </Component>
  );
};
