/// <reference types="Cypress" />
const serverUrl = Cypress.env('serverUrl');

describe('Nastavnici test', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
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
    cy.url().should('eq', Cypress.config().baseUrl + 'nastavnici');
  });

  it('Provjera da li je dodat nastavnik', () => {
    cy.intercept('GET', `${serverUrl}/nastavnici`).as('getNastavnici');
    cy.visit('/nastavnici');
    cy.wait('@getNastavnici');
    cy.getByData('nastavnici-container')
      .children()
      .last()
      .contains('nastavnik Ime nastavnik Prezime');
  });
});
