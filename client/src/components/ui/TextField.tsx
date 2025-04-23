import { ChangeEvent, ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextFieldProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  inputClassName?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      name,
      label,
      value,
      defaultValue,
      placeholder,
      type = 'text',
      className = '',
      inputClassName = '',
      size = 'medium',
      fullWidth = false,
      disabled = false,
      error = false,
      helperText,
      variant = 'outlined',
      onChange,
      startAdornment,
      endAdornment,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      small: 'text-sm py-1 px-2',
      medium: 'py-2 px-3',
    }[size];

    const variantClasses = {
      outlined:
        'border border-gray-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
      filled: 'border border-gray-300 bg-gray-100 focus:bg-white focus:border-blue-500',
      standard: 'border-b border-gray-300 focus:border-blue-500',
    }[variant];

    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <div className={twMerge('flex flex-col', widthClass, className)}>
        {label && (
          <label
            htmlFor={id}
            className={twMerge(
              'mb-1 text-sm font-medium',
              error ? 'text-red-600' : 'text-gray-700',
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {startAdornment && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {startAdornment}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            className={twMerge(
              'rounded-md w-full focus:outline-none',
              sizeClasses,
              variantClasses,
              errorClasses,
              startAdornment ? 'pl-10' : '',
              endAdornment ? 'pr-10' : '',
              disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '',
              inputClassName,
            )}
            {...props}
          />
          {endAdornment && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">{endAdornment}</div>
          )}
        </div>
        {helperText && (
          <p className={twMerge('mt-1 text-xs', error ? 'text-red-600' : 'text-gray-500')}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';
