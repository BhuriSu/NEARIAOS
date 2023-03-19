

// first page to finish process
describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  })
  it('Click login in button', () =>{
    cy.get("[data-cy='start-button']").click();
    cy.get("[data-cy='login-submit-button']").click();
    cy.get("[data-cy='input-email']").type('shonuvy@gmail.com');
    cy.get("[data-cy='input-password']").type('testpass000');
    cy.get("[data-cy='login-submit-button']").click();
    cy.get("[data-cy='submit-process']").click();
    
  })
})