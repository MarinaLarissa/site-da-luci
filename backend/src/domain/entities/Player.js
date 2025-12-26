/**
 * Player Entity
 * Represents a TIBIA player in a loot session
 */
class Player {
  /**
   * Creates a Player instance
   * @param {string} name - Player name
   * @param {boolean} isLeader - Whether player is the session leader
   * @param {number} loot - Gold received during session
   * @param {number} supplies - Gold spent on supplies
   * @param {number} balance - Net balance (loot - supplies)
   * @param {number} damage - Damage dealt during session
   * @param {number} healing - Healing done during session
   * @param {number} profit - Additional profit to add (default: 0)
   * @param {number} waste - Additional waste to subtract (default: 0)
   */
  constructor(name, isLeader, loot, supplies, balance, damage, healing, profit = 0, waste = 0) {
    this.name = name;
    this.isLeader = isLeader;
    this.loot = loot;
    this.supplies = supplies;
    this.balance = balance;
    this.damage = damage;
    this.healing = healing;
    this.profit = profit;
    this.waste = waste;
  }

  /**
   * Calculate net balance including profit and waste
   * @returns {number} Net balance (balance + profit - waste)
   */
  get netBalance() {
    return this.balance + this.profit - this.waste;
  }

  /**
   * Check if player is active (participated in session)
   * @returns {boolean} True if player has damage > 0 OR healing > 0
   */
  get isActive() {
    return this.damage > 0 || this.healing > 0;
  }
}

export default Player;
