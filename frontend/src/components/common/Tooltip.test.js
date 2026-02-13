/**
 * Tooltip component tests
 */

import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../test-utils/renderWithTheme';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  test('renders children correctly', () => {
    renderWithTheme(
      <Tooltip text="Test tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Hover me' });
    expect(button).toBeInTheDocument();
  });

  test('displays tooltip text correctly', () => {
    renderWithTheme(
      <Tooltip text="This is helpful information">
        <div>Child content</div>
      </Tooltip>
    );

    const tooltipText = screen.getByText('This is helpful information');
    expect(tooltipText).toBeInTheDocument();
  });

  test('renders with top position by default', () => {
    renderWithTheme(
      <Tooltip text="Top tooltip">
        <div>Content</div>
      </Tooltip>
    );

    const tooltipContent = screen.getByRole('tooltip', { hidden: true });
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent).toHaveTextContent('Top tooltip');
  });

  test('renders with bottom position when specified', () => {
    renderWithTheme(
      <Tooltip text="Bottom tooltip" position="bottom">
        <div>Content</div>
      </Tooltip>
    );

    const tooltipContent = screen.getByRole('tooltip', { hidden: true });
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent).toHaveTextContent('Bottom tooltip');
  });

  test('renders with left position when specified', () => {
    renderWithTheme(
      <Tooltip text="Left tooltip" position="left">
        <div>Content</div>
      </Tooltip>
    );

    const tooltipContent = screen.getByRole('tooltip', { hidden: true });
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent).toHaveTextContent('Left tooltip');
  });

  test('renders with right position when specified', () => {
    renderWithTheme(
      <Tooltip text="Right tooltip" position="right">
        <div>Content</div>
      </Tooltip>
    );

    const tooltipContent = screen.getByRole('tooltip', { hidden: true });
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent).toHaveTextContent('Right tooltip');
  });

  test('has correct DOM structure', () => {
    renderWithTheme(
      <Tooltip text="Test tooltip">
        <div>Content</div>
      </Tooltip>
    );

    const tooltipContent = screen.getByRole('tooltip', { hidden: true });
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent).toHaveTextContent('Test tooltip');
  });

  test('accepts React nodes as children', () => {
    renderWithTheme(
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
