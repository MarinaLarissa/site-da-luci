/**
 * TransferList component tests
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransferList from './TransferList';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'calculator.resultsSection.transferList.title': 'Transfers',
        'calculator.resultsSection.transferList.noTransfers': 'No transfers needed! All players are balanced.',
        'calculator.resultsSection.transferList.copiedButton': '✓ Copied!',
        'calculator.resultsSection.transferList.instruction': 'Click on a transfer to copy it to clipboard'
      };
      return translations[key] || key;
    }
  })
}));

// Mock formatters
jest.mock('../../utils/formatters', () => ({
  formatGold: (amount) => `${amount} gp`
}));

describe('TransferList', () => {
  const mockTransfers = [
    { from: 'Player A', to: 'Player B', amount: 1000 },
    { from: 'Player C', to: 'Player D', amount: 500 }
  ];

  const mockCopyableText = 'transfer 1000 to Player B\ntransfer 500 to Player D';

  // Mock clipboard before each test
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve())
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty state when no transfers', () => {
    render(<TransferList transfers={[]} copyableText="" />);

    expect(screen.getByText('Transfers')).toBeInTheDocument();
    expect(screen.getByText('No transfers needed! All players are balanced.')).toBeInTheDocument();
  });

  test('renders empty state when transfers is null', () => {
    render(<TransferList transfers={null} copyableText="" />);

    expect(screen.getByText('No transfers needed! All players are balanced.')).toBeInTheDocument();
  });

  test('renders list of transfers correctly', () => {
    render(<TransferList transfers={mockTransfers} copyableText={mockCopyableText} />);

    expect(screen.getByText('Player A')).toBeInTheDocument();
    expect(screen.getByText('Player B')).toBeInTheDocument();
    expect(screen.getByText('Player C')).toBeInTheDocument();
    expect(screen.getByText('Player D')).toBeInTheDocument();
    expect(screen.getByText('1000 gp')).toBeInTheDocument();
    expect(screen.getByText('500 gp')).toBeInTheDocument();
  });

  test('displays copyable TIBIA commands', () => {
    render(<TransferList transfers={mockTransfers} copyableText={mockCopyableText} />);

    expect(screen.getByText('TIBIA Commands:')).toBeInTheDocument();

    // Use regex to match the multiline text more flexibly
    const commandsText = screen.getByText(/transfer 1000 to Player B/i);
    expect(commandsText).toBeInTheDocument();
  });

  test('copies transfer to clipboard when clicked', async () => {
    render(<TransferList transfers={mockTransfers} copyableText={mockCopyableText} />);

    const transferItems = screen.getAllByRole('button');
    fireEvent.click(transferItems[0]);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('transfer 1000 to Player B');
    });
  });

  test('shows copied indicator after click', async () => {
    render(<TransferList transfers={mockTransfers} copyableText={mockCopyableText} />);

    const transferItems = screen.getAllByRole('button');
    fireEvent.click(transferItems[0]);

    await waitFor(() => {
      expect(screen.getByText('✓ Copied!')).toBeInTheDocument();
    });
  });

  test('supports keyboard navigation with Enter key', async () => {
    render(<TransferList transfers={mockTransfers} copyableText={mockCopyableText} />);

    const transferItems = screen.getAllByRole('button');
    fireEvent.keyDown(transferItems[0], { key: 'Enter' });

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('transfer 1000 to Player B');
    });
  });

  test('supports keyboard navigation with Space key', async () => {
    render(<TransferList transfers={mockTransfers} copyableText={mockCopyableText} />);

    const transferItems = screen.getAllByRole('button');
    fireEvent.keyDown(transferItems[1], { key: ' ' });

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('transfer 500 to Player D');
    });
  });

  test('has correct accessibility attributes', () => {
    render(<TransferList transfers={mockTransfers} copyableText={mockCopyableText} />);

    const transferItems = screen.getAllByRole('button');

    transferItems.forEach((item) => {
      expect(item).toHaveAttribute('role', 'button');
      expect(item).toHaveAttribute('tabIndex', '0');
      expect(item).toHaveAttribute('aria-label');
    });
  });

  test('renders transfer arrow between from and to players', () => {
    render(<TransferList transfers={mockTransfers} copyableText={mockCopyableText} />);

    const arrows = screen.getAllByText('→');
    expect(arrows).toHaveLength(mockTransfers.length);
  });
});
