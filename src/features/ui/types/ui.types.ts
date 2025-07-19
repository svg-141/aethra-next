export interface HeroSectionProps {
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  children?: React.ReactNode;
  className?: string;
  onAction?: () => void;
  actionLabel?: string;
  actionIcon?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  icon?: string;
  count?: number;
  disabled?: boolean;
}

export interface FilterBarProps {
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
  className?: string;
  variant?: 'default' | 'pills' | 'tabs';
  size?: 'sm' | 'md' | 'lg';
  showCounts?: boolean;
  multiSelect?: boolean;
  selectedValues?: string[];
  onMultiChange?: (values: string[]) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    icon?: string;
    disabled?: boolean;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export interface AccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
    icon?: string;
  }>;
  defaultOpen?: string[];
  allowMultiple?: boolean;
  className?: string;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: Array<{
    id: string;
    label: string;
    icon?: string;
    disabled?: boolean;
    onClick?: () => void;
  }>;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: string;
  className?: string;
  onSearch?: (value: string) => void;
  suggestions?: string[];
  loading?: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  className?: string;
}

export interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    icon?: string;
  }>;
  separator?: string;
  className?: string;
}

export interface AlertProps {
  type: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
  showIcon?: boolean;
}

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  className?: string;
}

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
  online?: boolean;
}

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave';
} 