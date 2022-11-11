/// <reference types="Cypress" />

describe('Ucenik/ucenici test', () => {
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

  it('Obrisan ucenik', () => {
    cy.contains('Ucenici').click().url().should('include', '/ucenici');
    cy.wait(4000);
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

  it('Trebali bi postojati detalji o uceniku', () => {
    cy.contains('Ucenici').click().url().should('include', '/ucenici');
    cy.contains('Details').click();
    const elements = [
      'Datum rođenja',
      'Otac',
      'Majka',
      'Maticni broj',
      'Adresa',
    ];
    elements.forEach((el) => {
      cy.getByData('ucenik-data').contains(el);
    });
    cy.getByData('ucenik-container').find('h1').should('exist');
    cy.getByData('ucenik-container').find('img').should('exist');
    cy.getByData('ucenik-container').contains('Delete');
    cy.getByData('ucenik-container').contains('Edit');
  });

  it('Testiranje ucenikovih razreda', () => {
    cy.get('nav')
      .contains('Ucenici')
      .click()
      .url()
      .should('include', '/ucenici');
    cy.contains('Details').click();
    cy.get('.react-tabs').should('exist').find('ul>li').should('exist');
    cy.contains('Razrednik').should('exist');
    cy.contains('Skolska godina').should('exist');
  });
  /* .its('response.statusCode').should('eq', 200) --------> Nije loše,  write Cypress commands serially cy.wait('@alias') cy.get(...), ne kačiti cypress komande unutar .then*/

  it('Testiranje ucenikovih razreda ako nema razreda', () => {
    cy.intercept('GET', 'http://localhost:3001/ucenici').as('getUcenici');
    cy.visit('http://localhost:3000/ucenici');
    cy.wait('@getUcenici');
    cy.getByData('ucenici-container')
      //     .should('have.length.greaterThan', 1)
      .children()
      .last()
      .contains('Details')
      .click();
    cy.contains('Nisu definisani razredi');
  });

  it('Testiranje editovanja ucenikovih informacija na /ucenici ruti', () => {
    cy.intercept('GET', 'http://localhost:3001/ucenici').as('getUcenici');
    cy.visit('http://localhost:3000/ucenici');
    cy.wait('@getUcenici');
    cy.getByData('ucenik-container').last().contains('Edit').click();
    cy.url().should('include', '/edit');
    cy.get('form')
      .find('input')
      .each(($el) => {
        cy.get($el).invoke('val').should('not.be.empty');
      });
    cy.get('form').find('input').clear();
    const testData = [
      'nekoIme',
      'nekoPrezime',
      '2022-10-10',
      'https://cdn.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.webp',
      'mama',
      'babo',
      'Aneks',
      '1010101010101',
    ];
    cy.get('form').find('input').eq(0).type(testData[0]);
    cy.get('form').find('input').eq(1).type(testData[1]);
    cy.get('form').find('input').eq(2).type(testData[2]);
    cy.get('form').find('input').eq(3).type(testData[4]);
    cy.get('form').find('input').eq(4).type(testData[4]);
    cy.get('form').find('input').eq(5).type(testData[5]);
    cy.get('form').find('input').eq(6).type(testData[6]);
    cy.get('form').find('input').eq(7).type(testData[7]);
    cy.get('form').find('button').should('exist').click();
    cy.url().should('not.include', '/edit');
  });

  it('Testiranje editovanja ucenikovih informacija na ucenikovom profilu', () => {
    cy.intercept('GET', 'http://localhost:3001/ucenici').as('getUcenici');
    cy.visit('http://localhost:3000/ucenici');
    cy.wait('@getUcenici');
    cy.getByData('ucenik-container').last().contains('Details').click();
    cy.get('header').next().children().contains('Edit').click();
    cy.url().should('include', '/edit');
    cy.get('form')
      .find('input')
      .each(($el) => {
        cy.get($el).invoke('val').should('not.be.empty');
      });
    cy.get('form').find('input').clear();
    const testData = [
      'nekoIme2',
      'nekoPrezime2',
      '2022-10-11',
      'https://cdn.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.webp',
      'mama2',
      'babo2',
      'Aneks2',
      '10101010101012',
    ];
    cy.get('form').find('input').eq(0).type(testData[0]);
    cy.get('form').find('input').eq(1).type(testData[1]);
    cy.get('form').find('input').eq(2).type(testData[2]);
    cy.get('form').find('input').eq(3).type(testData[4]);
    cy.get('form').find('input').eq(4).type(testData[4]);
    cy.get('form').find('input').eq(5).type(testData[5]);
    cy.get('form').find('input').eq(6).type(testData[6]);
    cy.get('form').find('input').eq(7).type(testData[7]);
    cy.get('form').find('button').should('exist').click();
    cy.url().should('not.include', '/edit');
  });

  it('Testiranje editovanja ucenikovih informacija u ucenikovom profilu ako se uradi reload stranice', () => {
    cy.intercept('GET', 'http://localhost:3001/ucenici').as('getUcenici');
    cy.visit('http://localhost:3000/ucenici');
    cy.wait('@getUcenici');
    cy.getByData('ucenik-container').last().contains('Details').click();
    cy.reload();
    cy.getByData('ucenik-container').contains('Edit').click();
    cy.url().should('include', '/edit');
    cy.get('form')
      .find('input')
      .each(($el) => {
        cy.get($el).invoke('val').should('not.be.empty');
      });
    cy.get('form').find('input').clear();
    const testData = [
      'nekoIme2',
      'nekoPrezime2',
      '2022-10-11',
      'https://cdn-icons-png.flaticon.com/512/21/21104.png',
      'mama2',
      'babo2',
      'Aneks2',
      '10101010101012',
    ];
    cy.get('form').find('input').eq(0).type(testData[0]);
    cy.get('form').find('input').eq(1).type(testData[1]);
    cy.get('form').find('input').eq(2).type(testData[2]);
    cy.get('form').find('input').eq(3).type(testData[3]);
    cy.get('form').find('input').eq(4).type(testData[4]);
    cy.get('form').find('input').eq(5).type(testData[5]);
    cy.get('form').find('input').eq(6).type(testData[6]);
    cy.get('form').find('input').eq(7).type(testData[7]);
    cy.get('form').find('button').should('exist').click();
    cy.url().should('not.include', '/edit');
  });

  it('Testiranje brisanja ucenika unutar njegovog profila poslije reloada', () => {
    cy.intercept('GET', 'http://localhost:3001/ucenici').as('getUcenici');
    cy.visit('http://localhost:3000/ucenici');
    cy.wait('@getUcenici');
    cy.getByData('ucenik-container').last().contains('Details').click();
    cy.reload();
    cy.getByData('ucenik-container').contains('Delete').click();
    cy.url().should('eq', 'http://localhost:3000/ucenici');
  });

  it('Trebali bi postojati predmeti ucenika u odabranom razredu poslije reloada', () => {
    cy.intercept('GET', 'http://localhost:3001/ucenici').as('getUcenici');
    cy.visit('http://localhost:3000/ucenici');
    cy.wait('@getUcenici');
    cy.getByData('ucenik-container').first().contains('Details').click();
    cy.reload();
    cy.getByData('predmeti-tabs').should('exist');
    cy.getByData('predmeti-tabs')
      .children()
      .its('length')
      .should('be.greaterThan', 0);
  });

  it.only('Provjera dodavanja ocjene na ucenikovom profilu', () => {
    cy.intercept('GET', 'http://localhost:3001/ucenici').as('getUcenici');
    cy.visit('http://localhost:3000/ucenici');
    cy.wait('@getUcenici');
    cy.getByData('ucenik-container').first().contains('Details').click();
    cy.reload();
    cy.getByData('ocjene-container').its('length');
    cy.getByData('ocjene-container')
      .prev()
      .should('have.text', 'Dodaj ocjenu')
      .click();
    cy.get('select').last().select('5');
    cy.get('input').eq(1).type(5);
    cy.get('input').eq(2).type('Opis ocjene');
    cy.get('form')
      .children()
      .last()
      .should('have.text', 'Finnish adding')
      .click();
  });
});
