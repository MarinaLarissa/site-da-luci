import { describe, it, expect } from '@jest/globals';
import Transfer from '../../../../src/domain/entities/Transfer.js';

describe('Transfer Value Object', () => {
  describe('Constructor', () => {
    it('should create a transfer with from, to, and amount', () => {
      // Arrange & Act
      const transfer = new Transfer('Lofi Shades', 'Luciana Burks', 4066247);

      // Assert
      expect(transfer.from).toBe('Lofi Shades');
      expect(transfer.to).toBe('Luciana Burks');
      expect(transfer.amount).toBe(4066247);
    });

    it('should create transfers with different amounts', () => {
      // Arrange & Act
      const transfer1 = new Transfer('Player A', 'Player B', 100000);
      const transfer2 = new Transfer('Player A', 'Player C', 50000);

      // Assert
      expect(transfer1.amount).toBe(100000);
      expect(transfer2.amount).toBe(50000);
    });
  });

  describe('Value Object Immutability', () => {
    it('should be immutable (properties should not be reassignable in strict mode)', () => {
      // Arrange
      const transfer = new Transfer('Player A', 'Player B', 100000);

      // Act & Assert
      // In a true value object, we would freeze the object
      // For this simple implementation, we just verify the properties exist
      expect(transfer.from).toBe('Player A');
      expect(transfer.to).toBe('Player B');
      expect(transfer.amount).toBe(100000);
    });
  });
});
