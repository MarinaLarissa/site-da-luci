// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Custom command to set language
 * @example cy.setLanguage('pt-BR')
 */
Cypress.Commands.add('setLanguage', (language) => {
  cy.window().then((win) => {
    win.localStorage.setItem('i18nextLng', language);
  });
});

/**
 * Custom command to paste loot data into textarea
 * @example cy.pasteLootData(sessionData)
 */
Cypress.Commands.add('pasteLootData', (lootData) => {
  cy.get('[data-cy="loot-calculator-input-session"]')
    .clear()
    .type(lootData, { delay: 0 });
});

/**
 * Custom command to wait for calculation to complete
 * @example cy.waitForCalculation()
 */
Cypress.Commands.add('waitForCalculation', () => {
  cy.get('[data-cy="loot-calculator-button-calculate"]').should('not.be.disabled');
  cy.get('[data-cy="loot-calculator-results"]').should('be.visible');
});
