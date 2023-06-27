import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    // clear scores somehow
  });

  it("should allow you to register and login", () => {
    cy.visit('/')
    // click button with value of 9
    cy.get('button').contains('9').click()
    // get inner text of element with datatestid of running-total
    cy.get('[data-testid=running-total]').should('have.text', '9')
  });

});
