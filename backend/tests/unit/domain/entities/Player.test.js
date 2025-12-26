import { describe, it, expect } from '@jest/globals';
import Player from '../../../../src/domain/entities/Player.js';

describe('Player Entity', () => {
  describe('Constructor', () => {
    it('should create a player with all required fields', () => {
      // Arrange & Act
      const player = new Player(
        'Lofi Shades',
        true,
        12120799,
        179781,
        11941018,
        17660082,
        785634
      );

      // Assert
      expect(player.name).toBe('Lofi Shades');
      expect(player.isLeader).toBe(true);
      expect(player.loot).toBe(12120799);
      expect(player.supplies).toBe(179781);
      expect(player.balance).toBe(11941018);
      expect(player.damage).toBe(17660082);
      expect(player.healing).toBe(785634);
      expect(player.profit).toBe(0);
      expect(player.waste).toBe(0);
    });

    it('should create a player with optional profit and waste', () => {
      // Arrange & Act
      const player = new Player(
        'Test Player',
        false,
        100000,
        50000,
        50000,
        1000000,
        500000,
        10000,
        5000
      );

      // Assert
      expect(player.profit).toBe(10000);
      expect(player.waste).toBe(5000);
    });
  });

  describe('netBalance getter', () => {
    it('should calculate netBalance = balance + profit - waste', () => {
      // Arrange
      const player = new Player(
        'Test Player',
        false,
        100000,
        50000,
        50000,
        1000000,
        500000,
        10000,
        5000
      );

      // Act
      const netBalance = player.netBalance;

      // Assert
      // netBalance = 50000 + 10000 - 5000 = 55000
      expect(netBalance).toBe(55000);
    });

    it('should return balance when profit and waste are zero', () => {
      // Arrange
      const player = new Player('Test Player', false, 100000, 50000, 50000, 1000000, 500000);

      // Act
      const netBalance = player.netBalance;

      // Assert
      expect(netBalance).toBe(50000);
    });

    it('should handle negative net balance', () => {
      // Arrange
      const player = new Player(
        'Test Player',
        false,
        50000,
        100000,
        -50000,
        1000000,
        500000,
        0,
        20000
      );

      // Act
      const netBalance = player.netBalance;

      // Assert
      // netBalance = -50000 + 0 - 20000 = -70000
      expect(netBalance).toBe(-70000);
    });
  });

  describe('isActive getter', () => {
    it('should return true when player has damage', () => {
      // Arrange
      const player = new Player('Test Player', false, 100000, 50000, 50000, 1000000, 0);

      // Act & Assert
      expect(player.isActive).toBe(true);
    });

    it('should return true when player has healing', () => {
      // Arrange
      const player = new Player('Test Player', false, 100000, 50000, 50000, 0, 500000);

      // Act & Assert
      expect(player.isActive).toBe(true);
    });

    it('should return true when player has both damage and healing', () => {
      // Arrange
      const player = new Player('Test Player', false, 100000, 50000, 50000, 1000000, 500000);

      // Act & Assert
      expect(player.isActive).toBe(true);
    });

    it('should return false when player has zero damage and zero healing', () => {
      // Arrange
      const player = new Player('Inactive Player', false, 0, 0, 0, 0, 0);

      // Act & Assert
      expect(player.isActive).toBe(false);
    });
  });
});
