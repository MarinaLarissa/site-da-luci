import { describe, it, expect } from '@jest/globals';
import CalculateLootSplitUseCase from '../../../../../src/application/use-cases/loot-split/CalculateLootSplitUseCase.js';
import Player from '../../../../../src/domain/entities/Player.js';
import LootSession from '../../../../../src/domain/entities/LootSession.js';

describe('CalculateLootSplitUseCase', () => {
  describe('execute method', () => {
    it('should calculate transfers for 3-player session (real TIBIA data)', () => {
      // Arrange
      const useCase = new CalculateLootSplitUseCase();

      const lofi = new Player('Lofi Shades', true, 12120799, 179781, 11941018, 17660082, 785634);
      const luciana = new Player('Luciana Burks', false, 277020, 381162, -104142, 17145590, 9169753);
      const youngVex = new Player('Young Vex', false, 539786, 490348, 49438, 18737566, 2666860);

      const session = new LootSession(
        'session-1',
        new Date('2025-12-25T17:48:04.000Z'),
        new Date('2025-12-25T20:56:53.000Z'),
        '03:08h',
        'Leader',
        12937605,
        1051291,
        11886314,
        [lofi, luciana, youngVex]
      );

      // Act
      const transfers = useCase.execute(session);

      // Assert
      expect(transfers).toHaveLength(2);

      // Lofi Shades (creditor) sends to Luciana Burks (debtor)
      expect(transfers[0].from).toBe('Lofi Shades');
      expect(transfers[0].to).toBe('Luciana Burks');
      expect(transfers[0].amount).toBe(4066247);

      // Lofi Shades (creditor) sends to Young Vex (debtor)
      expect(transfers[1].from).toBe('Lofi Shades');
      expect(transfers[1].to).toBe('Young Vex');
      expect(transfers[1].amount).toBe(3912667);
    });

    it('should return empty array for single active player', () => {
      // Arrange
      const useCase = new CalculateLootSplitUseCase();

      const player = new Player('Solo Player', true, 100000, 50000, 50000, 1000000, 500000);
      const inactivePlayer = new Player('Inactive', false, 0, 0, 0, 0, 0);

      const session = new LootSession(
        'session-1',
        new Date(),
        new Date(),
        '03:08h',
        'Leader',
        100000,
        50000,
        50000,
        [player, inactivePlayer]
      );

      // Act
      const transfers = useCase.execute(session);

      // Assert
      expect(transfers).toHaveLength(0);
    });

    it('should return empty array when all players are balanced', () => {
      // Arrange
      const useCase = new CalculateLootSplitUseCase();

      const player1 = new Player('Player 1', true, 100000, 50000, 50000, 1000000, 500000);
      const player2 = new Player('Player 2', false, 100000, 50000, 50000, 1000000, 500000);

      const session = new LootSession(
        'session-1',
        new Date(),
        new Date(),
        '03:08h',
        'Leader',
        200000,
        100000,
        100000,
        [player1, player2]
      );

      // Act
      const transfers = useCase.execute(session);

      // Assert
      expect(transfers).toHaveLength(0);
    });

    it('should handle profit and waste adjustments correctly', () => {
      // Arrange
      const useCase = new CalculateLootSplitUseCase();

      // Player 1: balance 50k + profit 10k - waste 5k = netBalance 55k
      const player1 = new Player('Player 1', true, 100000, 50000, 50000, 1000000, 500000, 10000, 5000);

      // Player 2: balance 40k + profit 0 - waste 0 = netBalance 40k
      const player2 = new Player('Player 2', false, 80000, 40000, 40000, 800000, 600000);

      // Total netBalance = 55k + 40k = 95k
      // Fair share = 95k / 2 = 47.5k
      // Player 1 difference: 55k - 47.5k = +7.5k (creditor)
      // Player 2 difference: 40k - 47.5k = -7.5k (debtor)

      const session = new LootSession(
        'session-1',
        new Date(),
        new Date(),
        '03:08h',
        'Leader',
        180000,
        90000,
        90000,
        [player1, player2]
      );

      // Act
      const transfers = useCase.execute(session);

      // Assert
      expect(transfers).toHaveLength(1);
      expect(transfers[0].from).toBe('Player 1');
      expect(transfers[0].to).toBe('Player 2');
      expect(transfers[0].amount).toBe(7500);
    });

    it('should filter out inactive players from calculation', () => {
      // Arrange
      const useCase = new CalculateLootSplitUseCase();

      const activePlayer1 = new Player('Active 1', true, 100000, 50000, 50000, 1000000, 500000);
      const activePlayer2 = new Player('Active 2', false, 80000, 40000, 40000, 800000, 600000);
      const inactivePlayer = new Player('Inactive', false, 0, 0, 0, 0, 0);

      const session = new LootSession(
        'session-1',
        new Date(),
        new Date(),
        '03:08h',
        'Leader',
        180000,
        90000,
        90000,
        [activePlayer1, activePlayer2, inactivePlayer]
      );

      // Act
      const transfers = useCase.execute(session);

      // Assert
      // Should only consider 2 active players
      // Fair share = 90k / 2 = 45k
      // Player 1: 50k - 45k = +5k (creditor)
      // Player 2: 40k - 45k = -5k (debtor)
      expect(transfers).toHaveLength(1);
      expect(transfers[0].from).toBe('Active 1');
      expect(transfers[0].to).toBe('Active 2');
      expect(transfers[0].amount).toBe(5000);
    });

    it('should handle negative total balance correctly', () => {
      // Arrange
      const useCase = new CalculateLootSplitUseCase();

      // Waste session (spent more than looted)
      const player1 = new Player('Player 1', true, 50000, 100000, -50000, 1000000, 500000);
      const player2 = new Player('Player 2', false, 40000, 90000, -50000, 800000, 600000);

      // Total balance = -50k + -50k = -100k
      // Fair share = -100k / 2 = -50k
      // Both players have exact fair share, no transfers needed

      const session = new LootSession(
        'session-1',
        new Date(),
        new Date(),
        '03:08h',
        'Leader',
        90000,
        190000,
        -100000,
        [player1, player2]
      );

      // Act
      const transfers = useCase.execute(session);

      // Assert
      expect(transfers).toHaveLength(0);
    });

    it('should sort transfers by amount descending (largest first)', () => {
      // Arrange
      const useCase = new CalculateLootSplitUseCase();

      const creditor = new Player('Creditor', true, 100000, 0, 100000, 1000000, 500000);
      const debtor1 = new Player('Debtor 1', false, 0, 70000, -70000, 800000, 600000);
      const debtor2 = new Player('Debtor 2', false, 0, 30000, -30000, 900000, 400000);

      // Total = 100k - 70k - 30k = 0
      // Fair share = 0
      // Creditor: +100k
      // Debtor 1: -70k
      // Debtor 2: -30k

      const session = new LootSession(
        'session-1',
        new Date(),
        new Date(),
        '03:08h',
        'Leader',
        100000,
        100000,
        0,
        [creditor, debtor1, debtor2]
      );

      // Act
      const transfers = useCase.execute(session);

      // Assert
      expect(transfers).toHaveLength(2);
      // Largest transfer first
      expect(transfers[0].amount).toBe(70000);
      expect(transfers[1].amount).toBe(30000);
    });

    it('should minimize number of transfers (greedy algorithm)', () => {
      // Arrange
      const useCase = new CalculateLootSplitUseCase();

      // 2 creditors, 2 debtors
      const creditor1 = new Player('Creditor 1', true, 150000, 0, 150000, 1000000, 500000);
      const creditor2 = new Player('Creditor 2', false, 50000, 0, 50000, 800000, 600000);
      const debtor1 = new Player('Debtor 1', false, 0, 120000, -120000, 900000, 400000);
      const debtor2 = new Player('Debtor 2', false, 0, 80000, -80000, 700000, 300000);

      // Total = 150k + 50k - 120k - 80k = 0
      // Fair share = 0
      // Creditor 1: +150k, Creditor 2: +50k
      // Debtor 1: -120k, Debtor 2: -80k

      const session = new LootSession(
        'session-1',
        new Date(),
        new Date(),
        '03:08h',
        'Leader',
        200000,
        200000,
        0,
        [creditor1, creditor2, debtor1, debtor2]
      );

      // Act
      const transfers = useCase.execute(session);

      // Assert
      // Greedy algorithm should produce 3 transfers (optimal for this case)
      expect(transfers.length).toBeLessThanOrEqual(3);

      // Verify all transfers are valid
      transfers.forEach((transfer) => {
        expect(transfer.from).toBeDefined();
        expect(transfer.to).toBeDefined();
        expect(transfer.amount).toBeGreaterThan(0);
      });
    });
  });
});
