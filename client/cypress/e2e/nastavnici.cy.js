/// <reference types="Cypress" />

describe('Nastavnici test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Dodavanje nastavnika', () => {
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
    cy.url().should('eq', 'http://localhost:3000/nastavnici');
  });

  it.only('Provjera da li je dodat nastavnik', () => {
    cy.intercept('GET', 'http://localhost:3001/nastavnici').as('getNastavnici');
    cy.visit('http://localhost:3000/nastavnici');
    cy.wait('@getNastavnici');
    cy.getByData('nastavnici-container')
      .children()
      .last()
      .contains('nastavnik Ime nastavnik Prezime');
  });
});
