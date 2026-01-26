/**
 * E2E tests for Loot Split Calculator
 *
 * Test Coverage:
 * - P0: Happy path - Calculate split correctly for valid session data
 * - P0: Validation - Handle empty input gracefully
 * - P1: Edge cases - Load example data
 * - P1: I18n - Verify PT-BR and EN translations
 */

describe('Loot Split Calculator', () => {
  beforeEach(() => {
    // Arrange: Navigate to app
    cy.visit('/');
  });

  describe('P0: Happy Path - Basic Calculation', () => {
    it('should calculate loot split correctly for 3 players', () => {
      // Arrange: Load fixture data
      cy.fixture('example-session').then((data) => {
        const { sessionData, expectedResults } = data;

        // Act: Paste session data and calculate
        cy.pasteLootData(sessionData);
        cy.get('[data-cy="loot-calculator-button-calculate"]').click();

        // Assert: Wait for results to appear
        cy.waitForCalculation();

        // Assert: Verify summary cards
        cy.get('[data-cy="summary-total-balance"]')
          .should('be.visible')
          .and('contain', expectedResults.totalBalance);

        cy.get('[data-cy="summary-fair-share"]')
          .should('be.visible')
          .and('contain', expectedResults.fairShare);

        cy.get('[data-cy="summary-active-players"]')
          .should('be.visible')
          .and('contain', expectedResults.activePlayers);

        // Assert: Verify player list is rendered
        cy.get('[data-cy="player-list"]').should('be.visible');

        // Assert: Verify all 3 players are displayed
        cy.get('[data-cy="player-list"]')
          .find('[data-cy^="player-card-"]')
          .should('have.length', 3);
      });
    });

    it('should display results section after successful calculation', () => {
      // Arrange: Load example data
      cy.fixture('example-session').then((data) => {
        // Act: Paste and calculate
        cy.pasteLootData(data.sessionData);
        cy.get('[data-cy="loot-calculator-button-calculate"]').click();

        // Assert: Results section visible
        cy.get('[data-cy="loot-calculator-results"]').should('be.visible');

        // Assert: Summary grid visible
        cy.get('[data-cy^="summary-"]').should('have.length.at.least', 4);
      });
    });
  });

  describe('P0: Validation - Empty Input', () => {
    it('should disable calculate button when input is empty', () => {
      // Arrange: Input is empty by default

      // Assert: Calculate button should be disabled
      cy.get('[data-cy="loot-calculator-button-calculate"]')
        .should('be.disabled');
    });

    it('should enable calculate button when input has data', () => {
      // Arrange: Type some data
      cy.get('[data-cy="loot-calculator-input-session"]')
        .type('Session data: From 2025-12-25, 17:48:04 to 2025-12-25, 20:56:53');

      // Assert: Calculate button should be enabled
      cy.get('[data-cy="loot-calculator-button-calculate"]')
        .should('not.be.disabled');
    });
  });

  describe('P1: Edge Cases - Load Example', () => {
    it('should load example data when clicking load example button', () => {
      // Act: Click load example button
      cy.contains('button', /carregar exemplo|load example/i).click();

      // Assert: Textarea should have content
      cy.get('[data-cy="loot-calculator-input-session"]')
        .should('not.have.value', '')
        .and('contain.value', 'Session data:')
        .and('contain.value', 'Lofi Shades');

      // Assert: Calculate button should be enabled
      cy.get('[data-cy="loot-calculator-button-calculate"]')
        .should('not.be.disabled');
    });

    it('should calculate successfully after loading example', () => {
      // Arrange: Load example
      cy.contains('button', /carregar exemplo|load example/i).click();

      // Act: Calculate
      cy.get('[data-cy="loot-calculator-button-calculate"]').click();

      // Assert: Results should appear
      cy.waitForCalculation();
      cy.get('[data-cy="loot-calculator-results"]').should('be.visible');
    });
  });

  describe('P1: I18n - Language Switching', () => {
    it('should display Portuguese (PT-BR) translations by default or when set', () => {
      // Arrange: Set language to PT-BR
      cy.setLanguage('pt-BR');
      cy.reload();

      // Assert: Check Portuguese text
      cy.contains('Calculadora de Divisão de Loot').should('be.visible');
      cy.contains('Inserir Dados de Loot').should('be.visible');
      cy.contains('Calcular Divisão').should('be.visible');
      cy.contains('Carregar Exemplo').should('be.visible');
    });

    it('should display English (EN) translations when language is EN', () => {
      // Arrange: Set language to EN
      cy.setLanguage('en');
      cy.reload();

      // Assert: Check English text
      cy.contains('Loot Split Calculator').should('be.visible');
      cy.contains('Enter Loot Data').should('be.visible');
      cy.contains('Calculate Split').should('be.visible');
      cy.contains('Load Example').should('be.visible');
    });

    it('should maintain language preference after calculation', () => {
      // Arrange: Set language to EN and load example
      cy.setLanguage('en');
      cy.reload();
      cy.contains('button', /load example/i).click();

      // Act: Calculate
      cy.get('[data-cy="loot-calculator-button-calculate"]').click();

      // Assert: Results should be in English
      cy.waitForCalculation();
      cy.get('[data-cy="loot-calculator-results"]')
        .should('be.visible')
        .and('contain', 'Results');
    });
  });

  describe('P1: Hunt History Integration', () => {
    it('should open hunt history drawer when clicking history button', () => {
      // Act: Click hunt history button
      cy.get('[data-cy="hunt-history-button-open"]').click();

      // Assert: Drawer should be visible
      // Note: Add appropriate data-cy to HuntHistoryDrawer component for more specific assertion
      cy.contains(/histórico de hunts|hunt history/i).should('be.visible');
    });
  });

  describe('P2: Edge Cases - Invalid Data Handling', () => {
    it('should handle invalid session data gracefully', () => {
      // Arrange: Type invalid data
      cy.get('[data-cy="loot-calculator-input-session"]')
        .type('This is not valid session data');

      // Act: Try to calculate
      cy.get('[data-cy="loot-calculator-button-calculate"]').click();

      // Assert: Error message should appear or results should not display
      // Note: Verify error handling behavior based on backend response
      cy.get('[data-cy="loot-calculator-results"]').should('not.exist');
    });
  });
});
