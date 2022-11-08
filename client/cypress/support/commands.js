Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data=${selector}]`);
});
