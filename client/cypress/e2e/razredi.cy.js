const razrediUrl = Cypress.env('razrediUrl');
const serverUrl = Cypress.env('serverUrl');
describe('Razredi testovi', () => {
  beforeEach(() => {
    cy.login();
    cy.visit(razrediUrl);
  });

  it('Testiranje da li postoje dugme za dodavanje razreda', () => {
    cy.get('button').first().contains('Add razred');
  });

  it('Testiranje da li dugme add razred otvara formu za dodavanje razreda', () => {
    cy.get('button').first().contains('Add razred').click();
  });

  it('Testiranje url-a kad se otvori forma', () => {
    cy.get('button').first().contains('Add razred').click();
    cy.url().should('eq', `${razrediUrl}/add-razred`);
  });

  it('Testiranje da li forma dodavanje razreda radi', () => {
    cy.get('button').first().contains('Add razred').click();
    cy.get('form')
      .find('label')
      .eq(0)
      .should('have.text', 'Odaberi skolsku godinu');
    cy.get('form')
      .find('label')
      .eq(0)
      .next()
      .invoke('val')
      .should('not.be.empty');
    cy.get('form').find('label').eq(1).should('have.text', 'Razred');
    cy.get('form')
      .find('label')
      .eq(1)
      .next()
      .invoke('val')
      .should('to.be.empty');
    cy.get('form').find('label').eq(1).next().type('5');
    cy.get('form').find('label').eq(2).should('have.text', 'Odjeljenje');
    cy.get('form')
      .find('label')
      .eq(2)
      .next()
      .invoke('val')
      .should('to.be.empty');
    cy.get('form').find('label').eq(2).next().type('g');
    cy.get('form')
      .find('label')
      .eq(3)
      .should('have.text', 'Odaberi nastavnika');
    cy.get('form')
      .find('label')
      .eq(3)
      .next()
      .invoke('val')
      .should('not.be.empty');
    cy.get('form').find('button').should('have.text', 'Finnish adding').click();
    cy.url().should('not.include', '/add-razred');
  });

  it('Provjera da li postoji padajuci meni sa skolskim godinama', () => {
    cy.get('form').find('select').invoke('val').should('not.be.empty');
    cy.get('form').find('button').should('have.text', 'Pretraži');
  });

  it('Testiranje dropdowna da li mijenja vrijednosti', () => {
    cy.intercept('GET', `${serverUrl}skolske-godine`).as('getSkolskeGodine');
    cy.visit(`${razrediUrl}`);
    cy.wait('@getSkolskeGodine');
    cy.get('form select')
      .find('option')
      .invoke('val')
      .as('initialValue')
      .then((initialValue) => {
        cy.get('form')
          .find('select')
          .select(1)
          .invoke('val')
          .as('newValue')
          .then((newValue) => {
            if (initialValue === newValue) {
              throw new Error('Selected dropdown nije promijenio vrijednost');
            }
          });
      });
  });

  it('Provjera da li promjena godine mijenja razrede', () => {
    cy.intercept('GET', `${serverUrl}skolske-godine`).as('getSkolskeGodine');
    cy.visit(`${razrediUrl}`);
    cy.wait('@getSkolskeGodine');
    cy.getByData('razredi-container')
      .find('div p')
      .first()
      .then(($p) => {
        const txt = $p.text();
        cy.get('form select').select(1);
        cy.get('form button').click();
        cy.wait(1000);
        cy.getByData('razredi-container')
          .find('div p')
          .first()
          .then(($p) => {
            const txt2 = $p.text();
            if (txt === txt2) {
              throw new Error('Nije se promijenio state');
            }
          });
      });
  });
  it.only('Provjera da li se dodao novi razred', () => {
    cy.intercept('GET', `${serverUrl}skolske-godine`).as('getSkolskeGodine');
    cy.visit(`${razrediUrl}`);
    cy.wait('@getSkolskeGodine');
    cy.getByData('razred')
      .its('length')
      .as('numOfRazredsBeforeAdding')
      .then((numOfRazredsBeforeAdding) => {
        console.log('@numOfRazredsBeforeAdding');
        cy.get('button').first().contains('Add razred').click();
        cy.get('form input').eq(0).type('4');
        cy.get('form input').eq(1).type('a');
        cy.get('button').click();
        cy.wait(1000);
        cy.getByData('razred', { timeout: 1000 })
          .its('length')
          .as('numOfRazredsAfterAdding')
          .then((numOfRazredsAfterAdding) => {
            console.log(numOfRazredsAfterAdding);
            cy.get('@numOfRazredsBeforeAdding').should(
              'not.equal',
              numOfRazredsAfterAdding
            );
          });
      });
  });

  it('Provjera da li dugme na kartici razreda otvara razred', () => {
    cy.getByData('razred').first().contains('Details').click();
    cy.get('button').should('have.text', 'Dodaj ucenika u razred');
    cy.get('button').next().should('have.text', 'Ucenici u ovom razredu: ');
  });

  it('Testiranje da li dodaj ucenika u razred otvara formu', () => {
    cy.getByData('razred').first().contains('Details').click();
    cy.get('button').should('have.text', 'Dodaj ucenika u razred').click();
  });

  it('Testiranje da li u redu ruta kad se otvori forma da dodavanje ucenika u razred', () => {
    cy.getByData('razred').first().contains('Details').click();
    cy.get('button').should('have.text', 'Dodaj ucenika u razred').click();
    cy.url().should('include', '/add-ucenik');
  });

  it('Trebali bi postojati 3 select element kad se otvori forma', () => {
    cy.getByData('razred').first().contains('Details').click();
    cy.get('button').should('have.text', 'Dodaj ucenika u razred').click();
    cy.get('select').its('length').should('eq', 3);
  });
  it('trebao bi postojeti dropdown sa skolskim godinama', () => {
    cy.getByData('razred').first().contains('Details').click();
    cy.get('button').should('have.text', 'Dodaj ucenika u razred').click();
    cy.get('select').first().invoke('val').should('not.be.empty');
  });
});
