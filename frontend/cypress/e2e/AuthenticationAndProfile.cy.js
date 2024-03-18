describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('/login'); // Assuming '/login' is your login page URL
  });

  it('should successfully log in with email and password', () => {
    cy.get('[data-cy=login-email]').type('shonuvy@gmail.com');
    cy.get('[data-cy=login-password]').type('test000');
    cy.get('form').submit();
    cy.url().should('include', '/profiles');
  });

  it('should display error message for invalid email or password', () => {
    cy.get('[data-cy=login-email]').type('invalid@example.com');
    cy.get('[data-cy=login-password]').type('invalidpassword');
    cy.get('form').submit();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contain('Invalid email or password');
    });
  });

  // Add more test cases as needed
});