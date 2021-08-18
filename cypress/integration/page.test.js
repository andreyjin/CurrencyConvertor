describe("e2e testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should check if header exists", () => {
    cy.get('[cy-test-id="header"]').contains("Convertor");
  });
  it("should check if formula is working correctly when USD -> EURO", () => {
    cy.get('[cy-test-id="left-currency"]').type(4.8);
    cy.get('[cy-test-id="right-currency"]')
      .find("input")
      .should("have.value", 4);
  });
  it("should check if formula is working correctly when EURO -> USD", () => {
    cy.get('[cy-test-id="left-currency-select"]').click();
    cy.get('[data-value="Euro"]').click();

    cy.get('[cy-test-id="right-currency-select"]').click();
    cy.get('[data-value="USD"]').click();
    cy.get('[cy-test-id="left-currency"]').find("input").clear();
    cy.get('[cy-test-id="left-currency"]').type(1);
    cy.get('[cy-test-id="right-currency"]')
      .find("input")
      .should("have.value", 1.2);
  });
});
