describe("Sign In E2E Test", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-in');
  });

  it("should successfully log in with valid credentials and redirect to dashboard", () => {

    cy.get('input[type="email"]').type(Cypress.env('test_user_email'));
    cy.get('input[type="password"]').type(Cypress.env('test_user_password'));

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/browse-artworks");

    cy.contains("Search artworks");
  });

  it("should show an error message for invalid credentials", () => {

    cy.get('input[type="email"]').type("invalid@email.com");
    cy.get('input[type="password"]').type("invalid password");

    cy.get('button[type="submit"]').click();

    cy.contains("Error");

    cy.url().should("include", "/sign-in");
  });
});
