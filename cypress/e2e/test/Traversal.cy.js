describe('Traversal', () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/traversal")
  });
  it('children', () => {
    cy.get('.traversal-breadcrumb')
        .children('.active')
        .should('contain', 'Data')
  });

  it('closest', () => {
    cy.get('.traversal-badge')
        .closest('ul')
        .should('have.class', 'list-group')
  });

  it('eq', () => {
    //To get a DOM element at a specific index, use the .eq() command.
    cy.get('.traversal-list>li')
        .eq(2).should('contain', 'persian')
  });

  it('filter', () => {
    //To get DOM elements that match a specific selector, use the .filter() command.
    cy.get('.traversal-nav>li')
        .filter('.active').should('contain', 'About')
  });

  it('find', () => {
    //To get descendant DOM elements of the selector, use the .find() command.
    cy.get('.traversal-pagination').find('li').find('a').should('have.length', 7)
  });
});