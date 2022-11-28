const baseUrl = Cypress.config().baseUrl;
describe('Navigacioni linkovi', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('Testiranje navigacije', () => {
    cy.get('a[href="/home"').should('have.text', 'Home').click();
    cy.contains('Ovo je pocetna');

    cy.get('a[href="/predmeti"').should('have.text', 'Predmeti').click();
    cy.contains('Add predmet');

    cy.get('a[href="/nastavnici"').should('have.text', 'Nastavnici').click();
    cy.contains('Add nastavnik');

    cy.get('a[href="/ucenici"').should('have.text', 'Ucenici').click();
    cy.contains('Add ucenik');

    cy.get('a[href="/razredi"').should('have.text', 'Razredi').click();
    cy.contains('Add razred');

    cy.get('a[href="/"').should('have.text', 'Logout').click();
    cy.contains('Login');
  });
});
