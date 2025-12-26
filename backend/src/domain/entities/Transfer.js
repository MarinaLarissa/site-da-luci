/**
 * Transfer Value Object
 * Represents a money transfer between two players
 * Immutable: once created, cannot be modified
 */
class Transfer {
  /**
   * Creates a Transfer instance
   * @param {string} from - Player who sends money (CREDITOR)
   * @param {string} to - Player who receives money (DEBTOR)
   * @param {number} amount - Amount to transfer (in gold pieces)
   */
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;

    // Freeze object to make it immutable (value object pattern)
    Object.freeze(this);
  }
}

export default Transfer;
