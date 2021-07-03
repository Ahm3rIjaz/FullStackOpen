describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Ahmer',
      username: 'ahm3r',
      password: 'cypress'
    }
    const user2 = {
      name: 'tester',
      username: 'tester',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1) 
    cy.request('POST', 'http://localhost:3003/api/users/', user2) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ahm3r')
      cy.get('#password').type('cypress')
      cy.get('#login-button').click()

      cy.contains('ahm3r logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong Credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ahm3r', password: 'cypress' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#author').type('tester')
      cy.get('#title').type('testing with cypress')
      cy.get('#url').type('test.com')
      cy.contains('create').click()
      cy.contains('testing with cypress')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'test Blog',
          author: 'tester',
          url: 'test.com'
        })
      })

      it('user can like the blog', function() {
        cy.contains('test Blog').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.contains('like')
      })

      it('user who created a blog can delete it', function() {
        cy.contains('test Blog').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.contains('delete')
      })

      it('users other than who created the blog cannot delete it', function() {
        cy.login({ username: 'tester', password: 'test' })
        cy.contains('test Blog').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('delete').should('not.exist')
      })
    })

    describe('and multiple blog exists', function() {
      beforeEach(() => {
        cy.createBlog({
          title: 'test Blog 1',
          author: 'tester1',
          url: 'test1.com'
        })
        cy.createBlog({
          title: 'test Blog 2',
          author: 'tester2',
          url: 'test2.com'
        })
        cy.createBlog({
          title: 'test Blog 3',
          author: 'tester3',
          url: 'test3.com'
        })
      })

      it('blogs are ordered with inreasing number of likes', function() {
        cy.contains('test Blog').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.contains('like')
      })
    })
  })
})