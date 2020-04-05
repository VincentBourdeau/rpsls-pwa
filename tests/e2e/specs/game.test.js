// https://docs.cypress.io/api/introduction/api.html

describe('Is the Game logic still works?', () => {
  it('Play the game with Paper', () => {
    cy.visit('/home')

    cy.get('.controls-btn.paper').should('be.visible')

    cy.get('.controls-btn.paper').click()

    cy.get('.result-decision').should('be.visible')

    cy.get('.game-results-board').should('be.visible')

    cy.get('.bot-choice .controls-btn').then(($el) => {
      const botChoice = $el.get(0).getAttribute('class').replace('controls-btn ', '')

      if (botChoice === 'paper') {
        cy.contains('.result-heading', ' You had a Draw ')
      } else if (botChoice === 'rock' || botChoice === 'spock') {
        cy.contains('.result-heading', ' You Win ')
      } else {
        cy.contains('.result-heading', ' You Loose ')
      }
    })
  })
})
