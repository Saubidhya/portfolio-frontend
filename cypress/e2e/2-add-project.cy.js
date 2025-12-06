describe('Part 2: Sign In and Add Project', () => {
    beforeEach(() => {
      // 1. Visit Login
      cy.visit('/login');
      
      // 2. Enter REAL credentials (MAKE SURE THESE ARE CORRECT)
      cy.get('input[type="email"]').type('spandi14@my.centennialcollege.ca'); 
      cy.get('input[type="password"]').type('Saubidhya123@'); 
      
      // 3. Click Login
      cy.get('button[type="submit"]').click();
  
      // 4. WAIT for the alert or redirect
      // We wait for the URL to change to home '/' or check for "Logout" button
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`Login Successful!`);
      });
      
      cy.wait(2000); // Give 2 seconds for localStorage to save
    });
  
    it('Should add a new project', () => {
      // 5. Now go to projects
      cy.visit('/projects');
  
      // 6. Debug: Pause here to look at the screen if needed
      // cy.pause(); 
  
      // 7. Check if form is visible
      cy.get('input[name="title"]').should('be.visible');
  
      // 8. Type and Add
      cy.get('input[name="title"]').type('Cypress Test Project');
      cy.get('textarea[name="description"]').type('This is an automated test project.');
      cy.get('input[name="technologies"]').type('Cypress, React, Node');
      
      cy.contains('button', 'Add').click();
  
      cy.contains('Cypress Test Project').should('be.visible');
    });
  });