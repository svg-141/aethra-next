/**
 * Tests unitarios para el componente Card
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card, CardHeader, CardBody, CardFooter } from '../../../components/ui/Card';

describe('Card Component', () => {
  it('should render card with children', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    );
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('should apply correct variant classes', () => {
    const { rerender, container } = render(<Card variant="gaming">Gaming Card</Card>);
    expect(container.firstChild).toHaveClass('card-gaming');

    rerender(<Card variant="surface">Surface Card</Card>);
    expect(container.firstChild).toHaveClass('bg-theme-surface');
  });

  it('should apply animation classes by default', () => {
    const { container } = render(<Card>Animated Card</Card>);
    expect(container.firstChild).toHaveClass('animate-theme-hover');
  });

  it('should not apply animation classes when animated is false', () => {
    const { container } = render(<Card animated={false}>Static Card</Card>);
    expect(container.firstChild).not.toHaveClass('animate-theme-hover');
  });

  it('should apply glow classes when glow is true', () => {
    const { container } = render(<Card glow>Glowing Card</Card>);
    expect(container.firstChild).toHaveClass('animate-theme-glow');
  });

  it('should merge custom className', () => {
    const { container } = render(<Card className="custom-class">Custom Card</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass('cuadro');
  });
});

describe('Card Subcomponents', () => {
  describe('CardHeader', () => {
    it('should render header with correct classes', () => {
      const { container } = render(<CardHeader>Header Content</CardHeader>);
      expect(container.firstChild).toHaveClass('cuadro-header');
      expect(container.firstChild).toHaveClass('border-b');
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });
  });

  describe('CardBody', () => {
    it('should render body with correct classes', () => {
      const { container } = render(<CardBody>Body Content</CardBody>);
      expect(container.firstChild).toHaveClass('p-4');
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });
  });

  describe('CardFooter', () => {
    it('should render footer with correct classes', () => {
      const { container } = render(<CardFooter>Footer Content</CardFooter>);
      expect(container.firstChild).toHaveClass('border-t');
      expect(container.firstChild).toHaveClass('border-theme');
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });
  });

  it('should render complete card structure', () => {
    render(
      <Card variant="gaming">
        <CardHeader>Card Title</CardHeader>
        <CardBody>Card Content</CardBody>
        <CardFooter>Card Actions</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Actions')).toBeInTheDocument();
  });
});