import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseStyles = 'w-full bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 px-4 rounded-sm focus:ring-0 font-medium placeholder-[#bbb] transition-colors';
    const errorStyles = error ? 'ring-1 ring-red-500 text-red-900 placeholder-red-300' : '';

    const inputClasses = `${baseStyles} ${errorStyles} ${className}`;

    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-[13px] text-[#666] font-medium">
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={inputClasses}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-[12px] text-red-500 font-medium mt-1">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-[12px] text-[#888] font-medium mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
