declare namespace Cypress {
  interface Chainable {
    drag(subject: string): Chainable<Element>
    drop(target: string): Chainable<Element>
    login(email: string, password: string): Chainable<void>
  }
} 