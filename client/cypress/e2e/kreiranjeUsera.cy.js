const baseUrl = Cypress.config().baseUrl;

describe('Testiranje forme za kreiranje usera', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Testiranje url-a i da li forma sadrzi sve potrebno za reg usera', () => {
    cy.visit('/createUser');
    cy.get('form ul li label').should('have.length', 3);
    cy.get('form ul li input').should('have.length', 3);
    const fieldNames = ['Ime', 'email', 'Password'];
    cy.get('form ul li label').each((element, index, list) => {
      cy.wrap(element).should('contain.text', fieldNames[index]);
    });
  });

  it('Testing ime fielda', () => {
    cy.visit('/createUser');
    cy.get('form input').eq(0).type('_');
    cy.contains('You cannot use an underscore');
  });

  it('Input field ime on lose focus test', () => {
    cy.visit('/createUser');
    cy.get('form input').eq(0).focus().blur();
    cy.contains('Please fill out this field');
  });

  it('Testiranje email fielda', () => {
    cy.visit('/createUser');
    cy.get('form input').eq(1).focus().blur();
    cy.contains('Must include @');
  });

  it('Testiranje password fielda', () => {
    cy.visit('/createUser');
    cy.get('form input').eq(2).focus().blur();
    cy.contains('Must enter the password');
  });

  it.only('Testing unhappy path on submit user if all fields are empty', () => {
    cy.visit('/createUser');
    cy.get('form button').should('contain.text', 'Sign up').click();
  });
});
