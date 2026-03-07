import type { SelectHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', label, error, helperText, id, options, ...props }, ref) => {
        const inputId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

        // Matched styles of Championship form
        const baseStyles = 'w-full appearance-none bg-[#f4f4f4] border-none text-[#555] text-[14px] py-3.5 pl-4 pr-10 rounded-sm focus:ring-0 cursor-pointer font-medium transition-colors';
        const errorStyles = error ? 'ring-1 ring-red-500 text-red-900' : '';

        const inputClasses = `${baseStyles} ${errorStyles} ${className}`;

        return (
            <div className="w-full flex flex-col gap-2">
                {label && (
                    <label htmlFor={inputId} className="text-[13px] text-[#666] font-medium">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        id={inputId}
                        className={inputClasses}
                        ref={ref}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-[#888] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none stroke-2" />
                </div>
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

Select.displayName = 'Select';

export default Select;
