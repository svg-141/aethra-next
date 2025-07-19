import React, { useState } from 'react';
import { FilterBarProps, FilterOption } from '../types/ui.types';

export default function FilterBar({ 
  options, 
  selected, 
  onChange, 
  className,
  variant = 'default',
  size = 'md',
  showCounts = false,
  multiSelect = false,
  selectedValues = [],
  onMultiChange
}: FilterBarProps) {
  const [localSelected, setLocalSelected] = useState<string[]>(selectedValues);

  const handleOptionClick = (value: string) => {
    if (multiSelect && onMultiChange) {
      const newSelected = localSelected.includes(value)
        ? localSelected.filter(v => v !== value)
        : [...localSelected, value];
      
      setLocalSelected(newSelected);
      onMultiChange(newSelected);
    } else {
      onChange(value);
    }
  };

  const isSelected = (value: string) => {
    if (multiSelect) {
      return localSelected.includes(value);
    }
    return selected === value;
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'pills':
        return 'flex flex-wrap justify-center gap-2';
      case 'tabs':
        return 'flex border-b border-purple-900/50';
      default:
        return 'flex flex-wrap justify-center gap-3';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  const getOptionClasses = (option: FilterOption) => {
    const baseClasses = `font-medium flex items-center gap-2 transition-all ${getSizeClasses()}`;
    const isOptionSelected = isSelected(option.value);
    const isDisabled = option.disabled;

    if (isDisabled) {
      return `${baseClasses} opacity-50 cursor-not-allowed bg-gray-900/30 text-gray-500`;
    }

    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-full ${
          isOptionSelected 
            ? 'bg-purple-600 text-white' 
            : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
        }`;
      case 'tabs':
        return `${baseClasses} border-b-2 ${
          isOptionSelected 
            ? 'border-purple-500 text-white' 
            : 'border-transparent text-gray-300 hover:text-white'
        }`;
      default:
        return `${baseClasses} rounded-full ${
          isOptionSelected 
            ? 'bg-purple-900/70 text-white' 
            : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
        }`;
    }
  };

  return (
    <div className={`${getVariantClasses()} ${className || ''}`}>
      {options.map(option => (
        <button
          key={option.value}
          className={getOptionClasses(option)}
          onClick={() => !option.disabled && handleOptionClick(option.value)}
          disabled={option.disabled}
        >
          {option.icon && <i className={option.icon}></i>}
          <span>{option.label}</span>
          {showCounts && option.count !== undefined && (
            <span className="ml-1 px-2 py-0.5 bg-purple-900/50 text-xs rounded-full">
              {option.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
} 