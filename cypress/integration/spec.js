/// <reference types="cypress" />

it('uploads CSV file', () => {
  cy.visit('/')
  // cy.selectFile
  // https://on.cypress.io/selectfile
  cy.get('input#file')
    .selectFile('cypress/fixtures/list.csv')
    // confirm the file was selected
    // and the <input type=file> element has it
    .should(($el) => expect($el[0].files).to.have.length(1))
    .its('0.files.0')
    .should('have.property', 'name', 'list.csv')
  cy.contains('button', 'Upload File').click()

  cy.location('pathname').should('equal', '/upload')
  // confirm the entire list.csv fixture was uploaded
  cy.get('tbody tr').should('have.length', 2)
})
