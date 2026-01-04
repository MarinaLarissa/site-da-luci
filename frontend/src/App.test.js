import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Site da Luci title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Site da Luci/i);
  expect(titleElement).toBeInTheDocument();
});
