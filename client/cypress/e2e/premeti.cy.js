/// <reference types="Cypress" />

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Dodat predmet', () => {
    cy.contains('Predmeti').should('exist').click();
    cy.contains('Add predmet').click();
    cy.url().should('include', '/predmeti/add-predmet');
    cy.getByData('add-predmet-input');
  });
});
