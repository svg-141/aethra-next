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
        return 'flex border-b theme-border';
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
    const baseClasses = `theme-button font-medium flex items-center gap-2 transition-all ${getSizeClasses()}`;
    const isOptionSelected = isSelected(option.value);
    const isDisabled = option.disabled;

    if (isDisabled) {
      return `${baseClasses} opacity-50 cursor-not-allowed theme-bg-muted theme-text-muted`;
    }

    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-full ${
          isOptionSelected 
            ? 'theme-bg-primary theme-text-primary' 
            : 'theme-bg-surface theme-text-secondary hover:theme-bg-hover'
        }`;
      case 'tabs':
        return `${baseClasses} border-b-2 ${
          isOptionSelected 
            ? 'theme-border-primary theme-text-primary' 
            : 'border-transparent theme-text-secondary hover:theme-text-primary'
        }`;
      default:
        return `${baseClasses} rounded-full ${
          isOptionSelected 
            ? 'theme-bg-primary theme-text-primary' 
            : 'theme-bg-surface theme-text-secondary hover:theme-bg-hover'
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