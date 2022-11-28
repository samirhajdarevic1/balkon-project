const baseUrl = Cypress.config().baseUrl;

describe('Testiranje login forme', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Testiranje url-a i da li forma sadrzi sve potrebno za login usera', () => {
    cy.visit('/login');
    cy.get('form ul li label').should('have.length', 2);
    cy.get('form ul li input').should('have.length', 2);
    const fieldNames = ['Ime', 'Password'];
    cy.get('form ul li label').each((element, index, list) => {
      cy.wrap(element).should('contain.text', fieldNames[index]);
    });
  });
});
