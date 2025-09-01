/**
 * Tests unitarios para el componente Button
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../../../components/ui/Button';

describe('Button Component', () => {
  it('should render button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('should apply correct variant classes', () => {
    const { rerender } = render(<Button variant="gaming">Gaming Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-gaming');

    rerender(<Button variant="outline">Outline Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-outline-primary');
  });

  it('should apply correct size classes', () => {
    const { rerender } = render(<Button size="sm">Small Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-sm');

    rerender(<Button size="lg">Large Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-lg');
  });

  it('should show loading state', () => {
    render(<Button isLoading>Loading Button</Button>);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveClass('opacity-50');
  });

  it('should render with icon', () => {
    const icon = <i className="fas fa-star" data-testid="star-icon"></i>;
    render(<Button icon={icon}>Button with Icon</Button>);
    
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(screen.getByText('Button with Icon')).toBeInTheDocument();
  });

  it('should apply animation classes by default', () => {
    render(<Button>Animated Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('animate-theme-hover');
  });

  it('should not apply animation classes when animated is false', () => {
    render(<Button animated={false}>Static Button</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('animate-theme-hover');
  });

  it('should apply glow classes when glow is true', () => {
    render(<Button glow>Glowing Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('animate-theme-glow');
  });

  it('should merge custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
    expect(screen.getByRole('button')).toHaveClass('btn');
  });
});