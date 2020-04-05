// https://docs.cypress.io/api/introduction/api.html

describe('Is the App running properly?', () => {
  it('Visits the app root url', () => {
    cy.visit('/home')

    cy.contains('h1', 'RockPaperScissorsLizardSpock')

    cy.contains('.score-number-text', '0')

    cy.get('.controls-btn.scissors').should('be.visible')
    cy.get('.controls-btn.spock').should('be.visible')
    cy.get('.controls-btn.paper').should('be.visible')
    cy.get('.controls-btn.lizard').should('be.visible')
    cy.get('.controls-btn.rock').should('be.visible')
  })
})

describe('Does the game rules shoes up properly?', () => {
  it('Click on the Rules Cta', () => {
    cy.visit('/home')

    cy.get('a.rules-cta').click()

    cy.get('.rules-popup').should('be.visible')
  })
})
