describe('home page displays resources', () => {
    beforeEach(() => {
      cy.visit('https://academy-study-resources.netlify.app/')
    })
  
    it('displays the string BOOKFACE and Recent Resources', () => {
      cy.get('.heading').contains("Recent Resources")
      cy.contains("Recent Resources")
    })

    it('logs us in and allows up to upload a resource and takes us back to the homepage', () => {
        cy.get('select').select("Katie Davis")
        cy.contains("Upload Resource")
        cy.get('.upload--button').click()
        cy.contains("Resource Form")
        cy.get('#resource-form-resourceName').type("allo").should('have.value', 'allo')
        cy.get('form').submit()
        cy.get('#resource-form-resourceName').should('have.value', '')
        cy.get('button').eq(1).click()
        cy.get('.heading').contains("Recent Resources")
      })
   
})