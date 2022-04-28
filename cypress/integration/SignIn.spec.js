import { faker } from "@faker-js/faker"

describe("SignIn", () => {
	it("should login successfully", () => {
        const user = {
            email: faker.internet.email(),
            password: faker.internet.password()
        }
        
        cy.register(user)

        cy.visit("http://localhost:3000/sign-in");

		cy.get("#email").type(user.email);
		cy.get("#password").type(user.password);
		
		cy.intercept("POST", "/users/sign-in").as("signIn")

		cy.get("button[type=submit]").click();

		cy.wait("@signIn");
		
		cy.url().should("equal", "http://localhost:3000/disciplines");
	});
});