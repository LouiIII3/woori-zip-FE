// Import custom commands
import './commands';

// Example of a global hook
before(() => {
  cy.log('Cypress 테스트가 시작되었습니다!');
});

// Example of handling uncaught exceptions
Cypress.on('uncaught:exception', () => {
  return false; // Ignore uncaught exceptions
});
