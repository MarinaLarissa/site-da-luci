import { describe, it, expect } from '@jest/globals';
import TibiaLootParser from '../../../../src/infrastructure/parsers/TibiaLootParser.js';

describe('TibiaLootParser', () => {
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

  describe('parse method', () => {
    it('should parse valid session data into LootSession entity', () => {
      // Arrange
      const parser = new TibiaLootParser();

      // Act
      const session = parser.parse(validSessionText);

      // Assert
      expect(session).toBeDefined();
      expect(session.duration).toBe('03:08h');
      expect(session.lootType).toBe('Leader');
      expect(session.totalLoot).toBe(12937605);
      expect(session.totalSupplies).toBe(1051291);
      expect(session.totalBalance).toBe(11886314);
      expect(session.players).toHaveLength(3);
    });

    it('should parse session timestamps correctly', () => {
      // Arrange
      const parser = new TibiaLootParser();

      // Act
      const session = parser.parse(validSessionText);

      // Assert
      expect(session.startTime).toEqual(new Date('2025-12-25T17:48:04.000Z'));
      expect(session.endTime).toEqual(new Date('2025-12-25T20:56:53.000Z'));
    });

    it('should parse leader player correctly', () => {
      // Arrange
      const parser = new TibiaLootParser();

      // Act
      const session = parser.parse(validSessionText);

      // Assert
      const leader = session.players.find((p) => p.isLeader);
      expect(leader).toBeDefined();
      expect(leader.name).toBe('Lofi Shades');
      expect(leader.loot).toBe(12120799);
      expect(leader.supplies).toBe(179781);
      expect(leader.balance).toBe(11941018);
      expect(leader.damage).toBe(17660082);
      expect(leader.healing).toBe(785634);
    });

    it('should parse non-leader players correctly', () => {
      // Arrange
      const parser = new TibiaLootParser();

      // Act
      const session = parser.parse(validSessionText);

      // Assert
      const luciana = session.players.find((p) => p.name === 'Luciana Burks');
      expect(luciana).toBeDefined();
      expect(luciana.isLeader).toBe(false);
      expect(luciana.loot).toBe(277020);
      expect(luciana.supplies).toBe(381162);
      expect(luciana.balance).toBe(-104142);
      expect(luciana.damage).toBe(17145590);
      expect(luciana.healing).toBe(9169753);
    });

    it('should parse players with profit and waste', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const sessionWithProfitWaste = `Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53
Session: 03:08h
Loot Type: Leader
Loot: 100,000
Supplies: 50,000
Balance: 50,000

Test Player
  Loot: 100,000
  Supplies: 50,000
  Balance: 50,000
  Damage: 1,000,000
  Healing: 500,000
  Profit: 10,000
  Waste: 5,000`;

      // Act
      const session = parser.parse(sessionWithProfitWaste);

      // Assert
      const player = session.players[0];
      expect(player.profit).toBe(10000);
      expect(player.waste).toBe(5000);
    });

    it('should handle numbers with commas correctly', () => {
      // Arrange
      const parser = new TibiaLootParser();

      // Act
      const session = parser.parse(validSessionText);

      // Assert
      expect(session.totalLoot).toBe(12937605); // Parsed from "12,937,605"
      expect(session.players[0].damage).toBe(17660082); // Parsed from "17,660,082"
    });

    it('should throw error for invalid session format', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const invalidText = 'This is not a valid session data';

      // Act & Assert
      expect(() => parser.parse(invalidText)).toThrow('Invalid loot data format');
    });

    it('should throw error for empty input', () => {
      // Arrange
      const parser = new TibiaLootParser();

      // Act & Assert
      expect(() => parser.parse('')).toThrow('Invalid loot data format');
    });

    it('should throw error for missing session header', () => {
      // Arrange
      const parser = new TibiaLootParser();
      const missingHeader = `Lofi Shades (Leader)
  Loot: 12,120,799
  Supplies: 179,781
  Balance: 11,941,018`;

      // Act & Assert
      expect(() => parser.parse(missingHeader)).toThrow('Invalid loot data format');
    });
  });

  describe('parseNumber helper', () => {
    it('should remove commas and parse positive numbers', () => {
      // Arrange
      const parser = new TibiaLootParser();

      // Act
      const result = parser.parseNumber('12,937,605');

      // Assert
      expect(result).toBe(12937605);
    });

    it('should parse negative numbers', () => {
      // Arrange
      const parser = new TibiaLootParser();

      // Act
      const result = parser.parseNumber('-104,142');

      // Assert
      expect(result).toBe(-104142);
    });

    it('should parse numbers without commas', () => {
      // Arrange
      const parser = new TibiaLootParser();

      // Act
      const result = parser.parseNumber('500');

      // Assert
      expect(result).toBe(500);
    });
  });
});
