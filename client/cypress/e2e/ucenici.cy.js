/// <reference types="Cypress" />

describe('Nastavnici Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Dodat ucenik', () => {
    cy.contains('Ucenici').should('exist').click();
    cy.url().should('include', '/ucenici');
    cy.contains('Add ucenik').click();
    cy.getByData('ucenik-form').find('input').eq(0).type('Ime');
    cy.getByData('ucenik-form').find('input').eq(1).type('Prezime');
    cy.getByData('ucenik-form').find('input').eq(2).type('1995-01-01');
    cy.getByData('ucenik-form')
      .find('input')
      .eq(3)
      .type('https://cdn-icons-png.flaticon.com/512/149/149071.png')
      .should(
        'have.value',
        'https://cdn-icons-png.flaticon.com/512/149/149071.png'
      );
    cy.getByData('ucenik-form').find('input').eq(4).type('Otac');
    cy.getByData('ucenik-form').find('input').eq(5).type('Majka');
    cy.getByData('ucenik-form').find('input').eq(6).type('0000000000000');
    cy.getByData('ucenik-form').find('input').eq(7).type('adresa');
    cy.getByData('ucenik-form')
      .find('input')
      .invoke('val')
      .should('not.be.empty');
    cy.getByData('add-ucenik-button')
      .click()
      .url()
      .should('include', '/ucenici');
    cy.getByData('ucenici-container')
      .children()
      .last()
      .find('h1')
      .contains('Ime')
      .contains('Prezime');
    cy.getByData('ucenik-data')
      .last()
      .children()
      .each(($el) => {
        if ($el.text().startsWith('Datum rođenja:')) {
          cy.get($el).contains('1995-01-01');
        } else if ($el.text().startsWith('Otac:')) {
          cy.get($el).contains('Otac');
        } else if ($el.text().startsWith('Majka:')) {
          cy.get($el).contains('Majka');
        } else if ($el.text().startsWith('Maticni broj:')) {
          cy.get($el).contains('0000000000000');
        } else if ($el.text().startsWith('Adresa:')) {
          cy.get($el).contains('adresa');
        } else {
          cy.get($el).should('not.be.empty');
        }
      });
  });

  it.only('Obrisan ucenik', () => {
    cy.contains('Ucenici').click().url().should('include', '/ucenici');
    cy.wait(4000);
    let y = cy.getByData('ucenici-container').children().its('length');
    cy.getByData('ucenici-container')
      .children()
      .its('length')
      .as('x')
      .then((x) => {
        cy.getByData('ucenici-container')
          .children()
          .last()
          .contains('Delete')
          .click();
        cy.wait(4000);
        cy.getByData('ucenici-container')
          .children()
          .its('length')
          .as('y')
          .then((y) => {
            if (x === y) {
              throw new Error('Nije obrisan element');
            }
          });
      });
  });
});
