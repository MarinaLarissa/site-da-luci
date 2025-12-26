/**
 * ParseLootSessionUseCase
 * Orchestrates parsing of raw loot data and calculating transfers
 * This is the main entry point for the loot split feature
 */
class ParseLootSessionUseCase {
  /**
   * Creates instance with injected dependencies
   * @param {TibiaLootParser} parser - Parser for TIBIA loot data
   * @param {CalculateLootSplitUseCase} calculator - Calculator for loot split
   */
  constructor(parser, calculator) {
    this.parser = parser;
    this.calculator = calculator;
  }

  /**
   * Execute the complete loot split workflow
   * @param {string} rawText - Raw loot data from TIBIA client
   * @returns {Object} Complete result with session, transfers, summary, and copyable text
   * @throws {Error} If input is invalid
   */
  execute(rawText) {
    // Step 1: Parse raw text into LootSession entity
    const session = this.parser.parse(rawText);

    // Step 2: Calculate transfers
    const transfers = this.calculator.execute(session);

    // Step 3: Calculate summary statistics
    const summary = this._calculateSummary(session, transfers);

    // Step 4: Generate copyable text
    const copyableText = this._generateCopyableText(transfers);

    // Step 5: Group transfers by sender
    const groupedTransfers = this._groupTransfersBySender(transfers);

    return {
      session,
      transfers,
      summary,
      copyableText,
      groupedTransfers,
    };
  }

  /**
   * Calculate summary statistics for display
   * @private
   */
  _calculateSummary(session, transfers) {
    const activePlayers = session.activePlayers;
    const durationMinutes = session.durationInMinutes;

    // Calculate total net balance (considering profit/waste)
    const totalNetBalance = activePlayers.reduce((sum, player) => sum + player.netBalance, 0);

    // Calculate fair share per player
    const fairShare =
      activePlayers.length > 0 ? Math.round(totalNetBalance / activePlayers.length) : 0;

    // Calculate profit per hour per player
    const profitPerHour =
      durationMinutes > 0 ? Math.round((fairShare / durationMinutes) * 60) : 0;

    return {
      totalBalance: session.totalBalance,
      durationMinutes,
      activePlayers: activePlayers.length,
      fairShare,
      profitPerHour,
      transfersCount: transfers.length,
    };
  }

  /**
   * Generate copyable text for TIBIA in-game commands
   * @private
   */
  _generateCopyableText(transfers) {
    if (transfers.length === 0) {
      return 'No transfers needed. Only one active player.';
    }

    return transfers.map((t) => `transfer ${t.amount} to ${t.to}`).join('\n');
  }

  /**
   * Group transfers by sender for easier copy-paste
   * @private
   */
  _groupTransfersBySender(transfers) {
    const grouped = {};

    transfers.forEach((transfer) => {
      if (!grouped[transfer.from]) {
        grouped[transfer.from] = [];
      }
      grouped[transfer.from].push(transfer);
    });

    return grouped;
  }
}

export default ParseLootSessionUseCase;
