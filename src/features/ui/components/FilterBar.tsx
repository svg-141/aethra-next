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
        return 'flex flex-wrap justify-start gap-2 items-center';
      case 'tabs':
        return 'flex flex-wrap border-b theme-border overflow-x-auto';
      default:
        return 'flex flex-wrap justify-start gap-3 items-center';
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
    const baseClasses = `theme-button font-medium flex items-center gap-2 transition-all hover:scale-105 ${getSizeClasses()}`;
    const isOptionSelected = isSelected(option.value);
    const isDisabled = option.disabled;

    if (isDisabled) {
      return `${baseClasses} opacity-50 cursor-not-allowed theme-bg-muted theme-text-muted rounded-lg`;
    }

    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-full shadow-sm hover:shadow-md ${
          isOptionSelected
            ? 'theme-bg-primary theme-text-primary ring-2 ring-offset-2 ring-primary'
            : 'theme-bg-surface theme-text-secondary hover:theme-bg-hover'
        }`;
      case 'tabs':
        return `${baseClasses} border-b-2 whitespace-nowrap ${
          isOptionSelected
            ? 'theme-border-primary theme-text-primary font-semibold'
            : 'border-transparent theme-text-secondary hover:theme-text-primary hover:border-primary/30'
        }`;
      default:
        return `${baseClasses} rounded-lg shadow-sm hover:shadow-md ${
          isOptionSelected
            ? 'theme-bg-primary theme-text-primary ring-2 ring-offset-1 ring-primary/50'
            : 'theme-bg-surface theme-text-secondary hover:theme-bg-hover border theme-border'
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
          {option.icon && <i className={`${option.icon} icon-theme`}></i>}
          <span>{option.label}</span>
          {showCounts && option.count !== undefined && (
            <span className="ml-1 px-2 py-0.5 theme-badge text-xs rounded-full">
              {option.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
} 