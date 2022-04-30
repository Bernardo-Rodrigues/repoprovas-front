import { faker } from "@faker-js/faker"

describe("SignUp", () => {
	it("should register successfully", () => {
		const user = {
			email: faker.internet.email(),
			password: faker.internet.password()
		}

		cy.visit("http://localhost:3000/sign-up");
		cy.get("#email").type(user.email);
		cy.get("#password").type(user.password);
		cy.get("#confirm-password").type(user.password);
		cy.intercept("POST", "/users/sign-up").as("signUp")
		cy.get("button[type=submit]").click();
		cy.wait("@signUp");
		
		cy.url().should("equal", "http://localhost:3000/sign-in");
	});
});