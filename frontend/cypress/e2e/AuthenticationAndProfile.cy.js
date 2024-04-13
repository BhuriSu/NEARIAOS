describe('Main Page to Login Page', () => {
  it('Clicks Start button and logs in', () => {
    // Visit the main page
    cy.visit('http://localhost:5173');

    // Click the Start button
    cy.contains('[data-cy=start-button]', 'Start').click({ force: true },{ multiple: true });

    // Check if the URL changes to the login page
    cy.url().should('include', '/startForm');

    // Fill in email and password
    cy.get('[data-cy=login-email]').type('shonuvy@gmail.com');
    cy.get('[data-cy=login-password]').type('test000');

    // Click Log In button
    cy.get('[data-cy=login-button]').click({ force: true },{ multiple: true });

    // After clicking Log In, check if the URL changes to the profiles page
    cy.url().should('include', '/newAccount');
  });
});