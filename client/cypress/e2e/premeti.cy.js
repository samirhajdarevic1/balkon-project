/// <reference types="Cypress" />

describe('Testovi za predmete', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Dodati predmet', () => {
    cy.contains('Predmeti').should('exist').click();
    cy.contains('Add predmet').click();
    cy.url().should('include', '/predmeti/add-predmet');
    cy.getByData('add-predmet-input').type('Predmet');
    cy.get('button').click();
    cy.getByData('predmet-container')
      .children()
      .last()
      .should('contain', 'Predmet');
    cy.url().should('include', '/predmeti');
  });

  it.only('Obrisi predmet', () => {
    cy.contains('Predmeti').should('exist').click();
    cy.url().should('include', '/predmeti');
    cy.getByData('predmeti')
      .its('length')
      .as('brojPredmeta')
      .then((brojPredmeta) => {
        cy.getByData('predmeti').children().last().contains('a').click();
        cy.contains('Delete').click();
        cy.getByData('predmeti')
          .its('length')
          .as('noviBrojPredmeta')
          .then((noviBrojPredmeta) => {
            if (brojPredmeta === noviBrojPredmeta) {
              throw new Error('Nije obrisan element');
            }
          });
      });
  });

  it('Testiranje editovanja predmeta', () => {
    cy.intercept('GET', 'http://localhost:3001/predmeti').as('getPredmeti');
    //cy.visit('http://localhost:3000/predmeti');
    cy.contains('Predmeti').should('exist').click();
    cy.wait('@getPredmeti');
    cy.getByData('predmeti-container')
      .children()
      .last()
      .contains('Details')
      .click();
    cy.url().should('include', '/predmeti/');
    cy.contains('Edit').should('exist').click();
    cy.url().should('include', '/edit');
    cy.get('input').invoke('val').should('not.be.empty');
    cy.get('input').type('mxksmxskmxsk');
    cy.contains('Done editing').click();
    cy.url().should('not.include', '/edit');
  });
});
