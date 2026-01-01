/**
 * LanguageSelector component tests
 */

import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from './LanguageSelector';

// Mock react-i18next
const mockChangeLanguage = jest.fn();
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage
    }
  })
}));

describe('LanguageSelector', () => {
  beforeEach(() => {
    mockChangeLanguage.mockClear();
  });

  test('renders with English flag and text when language is EN', () => {
    render(<LanguageSelector />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('🇺🇸');
    expect(button).toHaveTextContent('EN');
  });

  test('has correct accessibility attributes', () => {
    render(<LanguageSelector />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to Portuguese');
    expect(button).toHaveAttribute('title', 'Switch to Portuguese');
  });

  test('calls changeLanguage when clicked', () => {
    render(<LanguageSelector />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockChangeLanguage).toHaveBeenCalledWith('pt-BR');
  });

  test('supports keyboard navigation', () => {
    render(<LanguageSelector />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // Button should be focusable by default
    button.focus();
    expect(button).toHaveFocus();
  });
});
