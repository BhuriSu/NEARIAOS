

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
    cy.get("[data-cy='input-name-process']").type('testuser');
    cy.get("[data-cy='input-Dob-process']").click();
    cy.get("[data-cy='input-activity-process']").type('USA');
    cy.get("[data-cy='next-process']").click();
    cy.get("[data-cy='next-process']").click();
    cy.get("[data-cy='submit-process']").click();
    
  })
})