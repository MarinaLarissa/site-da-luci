import Transfer from '../../../domain/entities/Transfer.js';

/**
 * CalculateLootSplitUseCase
 * Business logic for calculating fair loot distribution and generating transfers
 *
 * Algorithm: Greedy Two-Pointer Approach
 * - Separate players into creditors (have excess) and debtors (need money)
 * - Match largest debtor with largest creditor
 * - Minimize number of transfers required
 */
class CalculateLootSplitUseCase {
  /**
   * Execute the loot split calculation
   * @param {LootSession} session - The loot session to process
   * @returns {Array<Transfer>} Array of transfers sorted by amount (largest first)
   */
  execute(session) {
    // Get only active players
    const activePlayers = session.activePlayers;

    // Edge case: single player or no active players
    if (activePlayers.length <= 1) {
      return [];
    }

    // Step 1: Calculate fair share
    const totalNetBalance = activePlayers.reduce((sum, player) => sum + player.netBalance, 0);
    const fairShare = totalNetBalance / activePlayers.length;

    // Step 2: Calculate each player's difference from fair share
    const playersWithDifference = activePlayers.map((player) => ({
      name: player.name,
      netBalance: player.netBalance,
      difference: player.netBalance - fairShare,
    }));

    // Step 3: Separate into creditors and debtors
    const creditors = playersWithDifference
      .filter((p) => p.difference > 0.01) // Use small epsilon to handle floating point
      .sort((a, b) => b.difference - a.difference); // Sort descending (largest first)

    const debtors = playersWithDifference
      .filter((p) => p.difference < -0.01) // Use small epsilon to handle floating point
      .map((p) => ({ ...p, difference: Math.abs(p.difference) })) // Convert to positive for easier logic
      .sort((a, b) => b.difference - a.difference); // Sort descending (largest first)

    // Edge case: all players are balanced
    if (creditors.length === 0 || debtors.length === 0) {
      return [];
    }

    // Step 4: Generate transfers using greedy two-pointer algorithm
    const transfers = this._generateTransfers(creditors, debtors);

    // Step 5: Sort transfers by amount descending
    return transfers.sort((a, b) => b.amount - a.amount);
  }

  /**
   * Generate transfers using greedy two-pointer algorithm
   * @private
   * @param {Array} creditors - Players who will send money (sorted desc by excess)
   * @param {Array} debtors - Players who will receive money (sorted desc by deficit)
   * @returns {Array<Transfer>} Array of transfers
   */
  _generateTransfers(creditors, debtors) {
    const transfers = [];
    let creditorIndex = 0;
    let debtorIndex = 0;

    // Create mutable copies
    const creditorsQueue = creditors.map((c) => ({ ...c }));
    const debtorsQueue = debtors.map((d) => ({ ...d }));

    while (creditorIndex < creditorsQueue.length && debtorIndex < debtorsQueue.length) {
      const creditor = creditorsQueue[creditorIndex];
      const debtor = debtorsQueue[debtorIndex];

      // Calculate transfer amount (minimum of creditor's excess and debtor's deficit)
      const amountToTransfer = Math.min(creditor.difference, debtor.difference);

      // Create transfer (CREDITOR sends to DEBTOR)
      transfers.push(new Transfer(creditor.name, debtor.name, Math.round(amountToTransfer)));

      // Update remaining differences
      creditor.difference -= amountToTransfer;
      debtor.difference -= amountToTransfer;

      // Move to next player if current one is settled
      if (creditor.difference < 0.01) {
        creditorIndex++;
      }
      if (debtor.difference < 0.01) {
        debtorIndex++;
      }
    }

    return transfers;
  }
}

export default CalculateLootSplitUseCase;
