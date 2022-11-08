/// <reference types="Cypress" />

describe('Nastavnici test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Dodat nasatvnik', () => {
    cy.contains('Nastavnici').should('exist').click();
    cy.contains('Add nastavnik').click();
    cy.url().should('include', '/nastavnici/add-nastavnik');
    cy.getByData('nastavnik-form').find('input').eq(0).type('nastavnik Ime');
    cy.getByData('nastavnik-form')
      .find('input')
      .eq(1)
      .type('nastavnik Prezime');
    cy.location('pathname').should('eq', '/nastavnici/add-nastavnik');
    cy.contains('Finnish adding').click();
  });
});
