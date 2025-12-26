import { describe, it, expect } from '@jest/globals';
import LootSession from '../../../../src/domain/entities/LootSession.js';
import Player from '../../../../src/domain/entities/Player.js';

describe('LootSession Entity', () => {
  describe('Constructor', () => {
    it('should create a loot session with all required fields', () => {
      // Arrange
      const player1 = new Player('Player 1', true, 100000, 50000, 50000, 1000000, 500000);
      const player2 = new Player('Player 2', false, 80000, 40000, 40000, 800000, 600000);
      const players = [player1, player2];

      // Act
      const session = new LootSession(
        'session-123',
        new Date('2025-12-25T17:48:04.000Z'),
        new Date('2025-12-25T20:56:53.000Z'),
        '03:08h',
        'Leader',
        12937605,
        1051291,
        11886314,
        players
      );

      // Assert
      expect(session.id).toBe('session-123');
      expect(session.startTime).toEqual(new Date('2025-12-25T17:48:04.000Z'));
      expect(session.endTime).toEqual(new Date('2025-12-25T20:56:53.000Z'));
      expect(session.duration).toBe('03:08h');
      expect(session.lootType).toBe('Leader');
      expect(session.totalLoot).toBe(12937605);
      expect(session.totalSupplies).toBe(1051291);
      expect(session.totalBalance).toBe(11886314);
      expect(session.players).toHaveLength(2);
      expect(session.players[0].name).toBe('Player 1');
    });
  });

  describe('durationInMinutes getter', () => {
    it('should calculate duration in minutes from "HH:MMh" format', () => {
      // Arrange
      const session = new LootSession(
        'session-1',
        new Date(),
        new Date(),
        '03:08h',
        'Leader',
        0,
        0,
        0,
        []
      );

      // Act
      const minutes = session.durationInMinutes;

      // Assert
      // 03:08h = (3 * 60) + 8 = 188 minutes
      expect(minutes).toBe(188);
    });

    it('should handle single digit hours and minutes', () => {
      // Arrange
      const session = new LootSession('session-2', new Date(), new Date(), '1:05h', 'Leader', 0, 0, 0, []);

      // Act
      const minutes = session.durationInMinutes;

      // Assert
      // 1:05h = (1 * 60) + 5 = 65 minutes
      expect(minutes).toBe(65);
    });

    it('should handle zero hours', () => {
      // Arrange
      const session = new LootSession(
        'session-3',
        new Date(),
        new Date(),
        '0:30h',
        'Leader',
        0,
        0,
        0,
        []
      );

      // Act
      const minutes = session.durationInMinutes;

      // Assert
      expect(minutes).toBe(30);
    });
  });

  describe('activePlayers getter', () => {
    it('should return only active players (damage > 0 OR healing > 0)', () => {
      // Arrange
      const activePlayer1 = new Player('Active 1', true, 100000, 50000, 50000, 1000000, 500000);
      const activePlayer2 = new Player('Active 2', false, 80000, 40000, 40000, 800000, 0);
      const inactivePlayer = new Player('Inactive', false, 0, 0, 0, 0, 0);

      const session = new LootSession(
        'session-1',
        new Date(),
        new Date(),
        '03:08h',
        'Leader',
        0,
        0,
        0,
        [activePlayer1, activePlayer2, inactivePlayer]
      );

      // Act
      const activePlayers = session.activePlayers;

      // Assert
      expect(activePlayers).toHaveLength(2);
      expect(activePlayers[0].name).toBe('Active 1');
      expect(activePlayers[1].name).toBe('Active 2');
    });

    it('should return empty array when no active players', () => {
      // Arrange
      const inactivePlayer1 = new Player('Inactive 1', false, 0, 0, 0, 0, 0);
      const inactivePlayer2 = new Player('Inactive 2', false, 0, 0, 0, 0, 0);

      const session = new LootSession(
        'session-1',
        new Date(),
        new Date(),
        '03:08h',
        'Leader',
        0,
        0,
        0,
        [inactivePlayer1, inactivePlayer2]
      );

      // Act
      const activePlayers = session.activePlayers;

      // Assert
      expect(activePlayers).toHaveLength(0);
    });
  });
});
