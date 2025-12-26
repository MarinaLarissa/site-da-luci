import { describe, it, expect } from '@jest/globals';
import ParseLootSessionUseCase from '../../../../../src/application/use-cases/loot-split/ParseLootSessionUseCase.js';
import TibiaLootParser from '../../../../../src/infrastructure/parsers/TibiaLootParser.js';
import CalculateLootSplitUseCase from '../../../../../src/application/use-cases/loot-split/CalculateLootSplitUseCase.js';

describe('ParseLootSessionUseCase', () => {
  const validSessionText = `Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53
Session: 03:08h
Loot Type: Leader
Loot: 12,937,605
Supplies: 1,051,291
Balance: 11,886,314

Lofi Shades (Leader)
  Loot: 12,120,799
  Supplies: 179,781
  Balance: 11,941,018
  Damage: 17,660,082
  Healing: 785,634

Luciana Burks
  Loot: 277,020
  Supplies: 381,162
  Balance: -104,142
  Damage: 17,145,590
  Healing: 9,169,753

Young Vex
  Loot: 539,786
  Supplies: 490,348
  Balance: 49,438
  Damage: 18,737,566
  Healing: 2,666,860`;

  describe('execute method', () => {
    it('should parse session and calculate transfers', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const calculator = new CalculateLootSplitUseCase();
      const useCase = new ParseLootSessionUseCase(parser, calculator);

      // Act
      const result = useCase.execute(validSessionText);

      // Assert
      expect(result).toBeDefined();
      expect(result.session).toBeDefined();
      expect(result.transfers).toBeDefined();
      expect(result.summary).toBeDefined();
    });

    it('should return parsed session data', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const calculator = new CalculateLootSplitUseCase();
      const useCase = new ParseLootSessionUseCase(parser, calculator);

      // Act
      const result = useCase.execute(validSessionText);

      // Assert
      expect(result.session.duration).toBe('03:08h');
      expect(result.session.totalBalance).toBe(11886314);
      expect(result.session.players).toHaveLength(3);
    });

    it('should return calculated transfers', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const calculator = new CalculateLootSplitUseCase();
      const useCase = new ParseLootSessionUseCase(parser, calculator);

      // Act
      const result = useCase.execute(validSessionText);

      // Assert
      expect(result.transfers).toHaveLength(2);
      expect(result.transfers[0].from).toBe('Lofi Shades');
      expect(result.transfers[0].to).toBe('Luciana Burks');
      expect(result.transfers[0].amount).toBe(4066247);
    });

    it('should calculate summary statistics', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const calculator = new CalculateLootSplitUseCase();
      const useCase = new ParseLootSessionUseCase(parser, calculator);

      // Act
      const result = useCase.execute(validSessionText);

      // Assert
      expect(result.summary.totalBalance).toBe(11886314);
      expect(result.summary.durationMinutes).toBe(188);
      expect(result.summary.activePlayers).toBe(3);
      expect(result.summary.fairShare).toBeDefined();
      expect(result.summary.profitPerHour).toBeDefined();
    });

    it('should calculate fair share correctly', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const calculator = new CalculateLootSplitUseCase();
      const useCase = new ParseLootSessionUseCase(parser, calculator);

      // Act
      const result = useCase.execute(validSessionText);

      // Assert
      // Total balance: 11,886,314
      // Active players: 3
      // Fair share: 11,886,314 / 3 = 3,962,104.67 (rounded to 3962105)
      expect(result.summary.fairShare).toBe(3962105);
    });

    it('should calculate profit per hour correctly', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const calculator = new CalculateLootSplitUseCase();
      const useCase = new ParseLootSessionUseCase(parser, calculator);

      // Act
      const result = useCase.execute(validSessionText);

      // Assert
      // Fair share per player: 3,962,105
      // Duration: 188 minutes
      // Profit per hour: (3,962,105 / 188) * 60 = 1,264,502 (using netBalance)
      expect(result.summary.profitPerHour).toBe(1264502);
    });

    it('should generate copyable text for transfers', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const calculator = new CalculateLootSplitUseCase();
      const useCase = new ParseLootSessionUseCase(parser, calculator);

      // Act
      const result = useCase.execute(validSessionText);

      // Assert
      expect(result.copyableText).toBeDefined();
      expect(result.copyableText).toContain('transfer 4066247 to Luciana Burks');
      expect(result.copyableText).toContain('transfer 3912667 to Young Vex');
    });

    it('should group transfers by sender', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const calculator = new CalculateLootSplitUseCase();
      const useCase = new ParseLootSessionUseCase(parser, calculator);

      // Act
      const result = useCase.execute(validSessionText);

      // Assert
      expect(result.groupedTransfers).toBeDefined();
      expect(result.groupedTransfers['Lofi Shades']).toHaveLength(2);
    });

    it('should throw error for invalid input', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const calculator = new CalculateLootSplitUseCase();
      const useCase = new ParseLootSessionUseCase(parser, calculator);

      // Act & Assert
      expect(() => useCase.execute('invalid data')).toThrow('Invalid loot data format');
    });

    it('should handle single player session (no transfers needed)', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const calculator = new CalculateLootSplitUseCase();
      const useCase = new ParseLootSessionUseCase(parser, calculator);

      const singlePlayerText = `Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53
Session: 03:08h
Loot Type: Leader
Loot: 100,000
Supplies: 50,000
Balance: 50,000

Solo Player (Leader)
  Loot: 100,000
  Supplies: 50,000
  Balance: 50,000
  Damage: 1,000,000
  Healing: 500,000`;

      // Act
      const result = useCase.execute(singlePlayerText);

      // Assert
      expect(result.transfers).toHaveLength(0);
      expect(result.copyableText).toBe('No transfers needed. Only one active player.');
    });

    it('should handle session with inactive players', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const calculator = new CalculateLootSplitUseCase();
      const useCase = new ParseLootSessionUseCase(parser, calculator);

      const sessionWithInactive = `Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53
Session: 03:08h
Loot Type: Leader
Loot: 200,000
Supplies: 100,000
Balance: 100,000

Active Player (Leader)
  Loot: 100,000
  Supplies: 50,000
  Balance: 50,000
  Damage: 1,000,000
  Healing: 500,000

Another Active
  Loot: 100,000
  Supplies: 50,000
  Balance: 50,000
  Damage: 800,000
  Healing: 600,000

Inactive Player
  Loot: 0
  Supplies: 0
  Balance: 0
  Damage: 0
  Healing: 0`;

      // Act
      const result = useCase.execute(sessionWithInactive);

      // Assert
      expect(result.summary.activePlayers).toBe(2);
      expect(result.session.players).toHaveLength(3); // Total players
      expect(result.transfers).toHaveLength(0); // No transfers (both active players balanced)
    });
  });
});
