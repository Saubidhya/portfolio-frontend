describe('Part 3: Edit Project', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="email"]').type('spandi14@my.centennialcollege.ca'); 
      cy.get('input[type="password"]').type('Saubidhya123@');
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
    });
  
    it('Should edit an existing project', () => {
      cy.visit('/projects');
  
      // Find the project we just added and click Edit
      // We use .last() to get the most recent one usually
      cy.contains('Cypress Test Project')
        .parent()
        .find('.btn-edit')
        .click();
  
      // Change Title
      cy.get('input[name="title"]').clear().type('Cypress Project EDITED');
      
      // Click Update
      cy.contains('button', 'Update').click();
  
      // Verify change
      cy.contains('Cypress Project EDITED').should('be.visible');
    });
  });