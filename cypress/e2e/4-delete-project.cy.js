describe('Part 4: Delete Project', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="email"]').type('spandi14@centennialcollege.ca'); 
      cy.get('input[type="password"]').type('Saubidhya123@');
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
    });
  
    it('Should delete the project', () => {
      cy.visit('/projects');
  
      // Find the edited project and click Delete
      cy.contains('Cypress Project EDITED')
        .parent()
        .find('.btn-delete')
        .click();
  
      // Handle the browser "Confirm" dialog automatically
      cy.on('window:confirm', () => true);
  
      // Verify it is gone
      cy.contains('Cypress Project EDITED').should('not.exist');
    });
  });