import LootSession from '../../domain/entities/LootSession.js';
import Player from '../../domain/entities/Player.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * TibiaLootParser
 * Parses TIBIA client loot session data into domain entities
 */
class TibiaLootParser {
  /**
   * Parse raw text from TIBIA client into LootSession entity
   * @param {string} rawText - Raw session data from TIBIA
   * @returns {LootSession} Parsed loot session
   * @throws {Error} If input format is invalid
   */
  parse(rawText) {
    if (!rawText || rawText.trim().length === 0) {
      throw new Error('Invalid loot data format: empty input');
    }

    // Store rawText for player parsing (need to preserve whitespace)
    this.rawText = rawText;

    const lines = rawText.split('\n').map((line) => line.trim());

    // Parse session header
    const sessionData = this._parseSessionHeader(lines);

    // Parse players
    const players = this._parsePlayers();

    if (players.length === 0) {
      throw new Error('Invalid loot data format: no players found');
    }

    return new LootSession(
      uuidv4(), // Generate unique ID
      sessionData.startTime,
      sessionData.endTime,
      sessionData.duration,
      sessionData.lootType,
      sessionData.totalLoot,
      sessionData.totalSupplies,
      sessionData.totalBalance,
      players
    );
  }

  /**
   * Parse session header (first 6 lines)
   * @private
   */
  _parseSessionHeader(lines) {
    const sessionDataLine = lines.find((line) => line.startsWith('Session data:'));
    if (!sessionDataLine) {
      throw new Error('Invalid loot data format: missing session data header');
    }

    // Parse timestamps: "Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53"
    const timestampMatch = sessionDataLine.match(
      /From (\d{4}-\d{2}-\d{2}), (\d{2}:\d{2}:\d{2}) to (\d{4}-\d{2}-\d{2}), (\d{2}:\d{2}:\d{2})/
    );
    if (!timestampMatch) {
      throw new Error('Invalid loot data format: invalid timestamp format');
    }

    const startTime = new Date(`${timestampMatch[1]}T${timestampMatch[2]}.000Z`);
    const endTime = new Date(`${timestampMatch[3]}T${timestampMatch[4]}.000Z`);

    // Parse other header fields
    const duration = this._extractValue(lines, 'Session:');
    const lootType = this._extractValue(lines, 'Loot Type:');
    const totalLoot = this.parseNumber(this._extractValue(lines, 'Loot:'));
    const totalSupplies = this.parseNumber(this._extractValue(lines, 'Supplies:'));
    const totalBalance = this.parseNumber(this._extractValue(lines, 'Balance:'));

    return {
      startTime,
      endTime,
      duration,
      lootType,
      totalLoot,
      totalSupplies,
      totalBalance,
    };
  }

  /**
   * Parse all players from session data
   * @private
   */
  _parsePlayers() {
    const players = [];
    let currentPlayer = null;
    let currentPlayerData = {};

    // Don't trim lines in this method - we need to preserve whitespace for player detection
    const rawLines = this.rawText.split('\n');

    for (let i = 0; i < rawLines.length; i++) {
      const rawLine = rawLines[i];
      const line = rawLine.trim();

      // Skip empty lines
      if (line.length === 0) {
        continue;
      }

      // Check if line is a player name (doesn't start with whitespace and not a header field)
      const startsWithWhitespace = /^\s/.test(rawLine);
      const isHeaderField =
        line.startsWith('Session') ||
        line.startsWith('Loot Type') ||
        line.startsWith('Loot:') ||
        line.startsWith('Supplies:') ||
        line.startsWith('Balance:');

      if (!startsWithWhitespace && !isHeaderField) {
        // Save previous player if exists
        if (currentPlayer) {
          players.push(this._createPlayer(currentPlayer, currentPlayerData));
        }

        // Start new player
        const isLeader = line.includes('(Leader)');
        currentPlayer = line.replace('(Leader)', '').trim();
        currentPlayerData = { isLeader };
      }

      // Parse player stats (lines starting with whitespace after trimming)
      if (startsWithWhitespace) {
        if (line.startsWith('Loot:')) {
          currentPlayerData.loot = this.parseNumber(line.replace('Loot:', '').trim());
        } else if (line.startsWith('Supplies:')) {
          currentPlayerData.supplies = this.parseNumber(line.replace('Supplies:', '').trim());
        } else if (line.startsWith('Balance:')) {
          currentPlayerData.balance = this.parseNumber(line.replace('Balance:', '').trim());
        } else if (line.startsWith('Damage:')) {
          currentPlayerData.damage = this.parseNumber(line.replace('Damage:', '').trim());
        } else if (line.startsWith('Healing:')) {
          currentPlayerData.healing = this.parseNumber(line.replace('Healing:', '').trim());
        } else if (line.startsWith('Profit:')) {
          currentPlayerData.profit = this.parseNumber(line.replace('Profit:', '').trim());
        } else if (line.startsWith('Waste:')) {
          currentPlayerData.waste = this.parseNumber(line.replace('Waste:', '').trim());
        }
      }
    }

    // Save last player
    if (currentPlayer) {
      players.push(this._createPlayer(currentPlayer, currentPlayerData));
    }

    return players;
  }

  /**
   * Create Player entity from parsed data
   * @private
   */
  _createPlayer(name, data) {
    return new Player(
      name,
      data.isLeader || false,
      data.loot || 0,
      data.supplies || 0,
      data.balance || 0,
      data.damage || 0,
      data.healing || 0,
      data.profit || 0,
      data.waste || 0
    );
  }

  /**
   * Extract value from line containing a label
   * @private
   */
  _extractValue(lines, label) {
    const line = lines.find((l) => l.startsWith(label));
    if (!line) {
      throw new Error(`Invalid loot data format: missing ${label}`);
    }
    return line.replace(label, '').trim();
  }

  /**
   * Parse number string (remove commas and convert to number)
   * @param {string} str - Number string (e.g., "12,937,605" or "-104,142")
   * @returns {number} Parsed number
   */
  parseNumber(str) {
    return parseInt(str.replace(/,/g, ''), 10);
  }
}

export default TibiaLootParser;
