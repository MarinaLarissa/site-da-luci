/**
 * Tooltip component tests
 */

import { render, screen } from '@testing-library/react';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  test('renders children correctly', () => {
    render(
      <Tooltip text="Test tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Hover me' });
    expect(button).toBeInTheDocument();
  });

  test('displays tooltip text correctly', () => {
    render(
      <Tooltip text="This is helpful information">
        <div>Child content</div>
      </Tooltip>
    );

    const tooltipText = screen.getByText('This is helpful information');
    expect(tooltipText).toBeInTheDocument();
  });

  test('renders with top position by default', () => {
    render(
      <Tooltip text="Top tooltip">
        <div>Content</div>
      </Tooltip>
    );

    const tooltipContent = screen.getByRole('tooltip');
    expect(tooltipContent).toHaveClass('tooltip-top');
  });

  test('renders with bottom position when specified', () => {
    render(
      <Tooltip text="Bottom tooltip" position="bottom">
        <div>Content</div>
      </Tooltip>
    );

    const tooltipContent = screen.getByRole('tooltip');
    expect(tooltipContent).toHaveClass('tooltip-bottom');
  });

  test('renders with left position when specified', () => {
    render(
      <Tooltip text="Left tooltip" position="left">
        <div>Content</div>
      </Tooltip>
    );

    const tooltipContent = screen.getByRole('tooltip');
    expect(tooltipContent).toHaveClass('tooltip-left');
  });

  test('renders with right position when specified', () => {
    render(
      <Tooltip text="Right tooltip" position="right">
        <div>Content</div>
      </Tooltip>
    );

    const tooltipContent = screen.getByRole('tooltip');
    expect(tooltipContent).toHaveClass('tooltip-right');
  });

  test('has correct DOM structure', () => {
    render(
      <Tooltip text="Test tooltip">
        <div>Content</div>
      </Tooltip>
    );

    // Check tooltip content
    const tooltipContent = screen.getByRole('tooltip');
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent).toHaveClass('tooltip-content');
  });

  test('accepts React nodes as children', () => {
    render(
      <Tooltip text="Test tooltip">
        <div>
          <span>Multiple</span>
          <span>Children</span>
        </div>
      </Tooltip>
    );

    expect(screen.getByText('Multiple')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
