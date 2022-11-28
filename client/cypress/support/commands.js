Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data=${selector}]`, { timeout: 10000 });
});

Cypress.Commands.add(
  'login',
  (name = Cypress.env('name'), password = Cypress.env('password')) => {
    cy.request('POST', `${Cypress.env('serverUrl')}login`, {
      name: name,
      password: password,
    }).then(({ body }) => {
      console.log(body);
      window.localStorage.setItem('token', body.accessToken);
      // cy.visit('/home');
    });
  }
);
