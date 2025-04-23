import { ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface BoxProps {
  children: ReactNode;
  className?: string;
  component?: ElementType;
}

export const Box = ({ children, className = '', component: Component = 'div' }: BoxProps) => {
  return <Component className={className}>{children}</Component>;
};

interface StackProps {
  children: ReactNode;
  className?: string;
  direction?: 'row' | 'column';
  spacing?: number;
  component?: ElementType;
}

export const Stack = ({
  children,
  className = '',
  direction = 'column',
  spacing = 2,
  component: Component = 'div',
}: StackProps) => {
  const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';

  const spacingClasses =
    {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
    }[spacing] || 'gap-2';

  return (
    <Component className={twMerge(`flex ${directionClass} ${spacingClasses}`, className)}>
      {children}
    </Component>
  );
};

interface GridProps {
  children: ReactNode;
  className?: string;
  container?: boolean;
  item?: boolean;
  spacing?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
}

export const Grid = ({
  children,
  className = '',
  container = false,
  item = false,
  spacing = 0,
  xs,
  sm,
  md,
  lg,
}: GridProps) => {
  if (container) {
    const spacingClasses =
      {
        0: 'gap-0',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        5: 'gap-5',
        6: 'gap-6',
        8: 'gap-8',
      }[spacing] || 'gap-0';

    return (
      <div className={twMerge(`grid grid-cols-12 ${spacingClasses}`, className)}>{children}</div>
    );
  }

  if (item) {
    const xsClass = xs ? `col-span-${xs}` : '';
    const smClass = sm ? `sm:col-span-${sm}` : '';
    const mdClass = md ? `md:col-span-${md}` : '';
    const lgClass = lg ? `lg:col-span-${lg}` : '';

    return (
      <div className={twMerge(`${xsClass} ${smClass} ${mdClass} ${lgClass}`, className)}>
        {children}
      </div>
    );
  }

  return <div className={className}>{children}</div>;
};

interface DividerProps {
  className?: string;
}

export const Divider = ({ className = '' }: DividerProps) => {
  return <hr className={twMerge('border-t border-gray-200 my-4', className)} />;
};
