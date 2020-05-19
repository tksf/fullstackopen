describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Kalle Huttunen',
      username: 'kallevh',
      password: 'topsecret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    // cy.visit('http://localhost:3000')
    cy.get('html')
      .should('contain', 'Log in to application')
      .should('contain', 'username')
      .should('contain', 'password')

    // cy.get('input')
    // cy.contains('')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // cy.contains('login').click()
      cy.get('#username').type('kallevh')
      cy.get('#password').type('topsecret')
      cy.get('#login-button').click()

      cy.contains('Kalle Huttunen logged in')
    })

    it('fails with wrong credentials', function () {
      // cy.contains('login').click()
      cy.get('#username').type('kallevh')
      cy.get('#password').type('notsecret')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Kalle Huttunen logged in')
    })


    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'kallevh', password: 'topsecret' })
      })

      it('A blog can be created', function() {
        cy.contains('new note').click()
        cy.get('#blogTitle').type('a blog created by cypress')
        cy.get('#blogAuthor').type('Some Wise Man')
        cy.get('#blogUrl').type('http://www.yle.fi')
        cy.get('#createBlog').click()

        cy.get('.message')
          .should('contain', 'a new blog a blog created by cypress by Some Wise Man added')

        cy.get('html')
          .should('contain', 'a blog created by cypress')
      })

      it.only('a blog can be liked', function() {
        cy.createBlog({ title: 'first blog', author: 'Osmo Soinivaara', url: 'https://www.soininvaara.fi/' })
        cy.contains('view').parent().find('button').click()
        cy.contains('like').click()
        cy.contains('view').click()
        cy.contains('1')
      })

      it.only('user can delete a blog', function() {
        cy.createBlog({ title: 'first blog', author: 'Osmo Soinivaara', url: 'https://www.soininvaara.fi/' })
        cy.contains('view').parent().find('button').click()
        cy.contains('delete').click()

        // cy.on('window:alert', (str) => {
        //   cy.get('button').contains('OK').click()
        // })
        cy.visit('http://localhost:3000')
          .get('html')
          .should('not.contain', 'first blog')
          
      })
    })
  })
})
