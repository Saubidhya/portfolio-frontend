describe('Part 1: Sign Up', () => {
    it('Should allow a new user to sign up', () => {
      // 1. Visit the Register Page
      cy.visit('/register');
  
      // 2. Generate a random user so tests don't fail on "Duplicate Email"
      const randomId = Math.floor(Math.random() * 10000);
      const username = `testuser${randomId}`;
      const email = `test${randomId}@example.com`;
  
      // 3. Fill the form
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type('password123');
  
      // 4. Click Register
      cy.get('button[type="submit"]').click();
  
      // 5. Check if redirected to Login
      cy.url().should('include', '/login');
    });
  });