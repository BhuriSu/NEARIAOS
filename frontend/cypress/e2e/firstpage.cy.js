

// first page to finish process
describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  })
  it('Click login in button', () =>{
    cy.get("[data-cy='start-button']").click();
    cy.get("[data-cy='login-email']").type('shonuvy@gmail.com');
    cy.get("[data-cy='login-password']").type('test000');
  })
})