/**
 * LootSession Entity
 * Represents a complete loot hunting session in TIBIA
 */
class LootSession {
  /**
   * Creates a LootSession instance
   * @param {string} id - Unique session identifier
   * @param {Date} startTime - Session start timestamp
   * @param {Date} endTime - Session end timestamp
   * @param {string} duration - Session duration in "HH:MMh" format
   * @param {string} lootType - Loot type (e.g., "Leader", "Market")
   * @param {number} totalLoot - Total loot collected by all players
   * @param {number} totalSupplies - Total supplies spent by all players
   * @param {number} totalBalance - Total balance (totalLoot - totalSupplies)
   * @param {Array<Player>} players - Array of Player entities
   */
  constructor(
    id,
    startTime,
    endTime,
    duration,
    lootType,
    totalLoot,
    totalSupplies,
    totalBalance,
    players
  ) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.duration = duration;
    this.lootType = lootType;
    this.totalLoot = totalLoot;
    this.totalSupplies = totalSupplies;
    this.totalBalance = totalBalance;
    this.players = players;
  }

  /**
   * Parse duration string and return total minutes
   * @returns {number} Duration in minutes
   */
  get durationInMinutes() {
    // Parse "HH:MMh" format
    const [hours, minutes] = this.duration.replace('h', '').split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Get only active players (those who participated in combat)
   * @returns {Array<Player>} Array of active players
   */
  get activePlayers() {
    return this.players.filter((player) => player.isActive);
  }
}

export default LootSession;
