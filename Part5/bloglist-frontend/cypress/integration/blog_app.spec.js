describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('LoginForm is shown', function() {
    cy.contains('Login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()

      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Successfully logged in!')
    })

    it('fails with wrong credentials', function(){
      cy.contains('Login').click()

      cy.get('#username').type('mluukkai')
      cy.get('#password').type('Cicada')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()

      cy.get('#Title').type('test title')
      cy.get('#Author').type('test Author')
      cy.get('#Url').type('test Url')
      cy.contains('create').click()

      cy.contains('Blog: test title has been successfully added.')
    })

    describe('When a blog has been added', function(){
      beforeEach(function(){
        cy.contains('New Blog').click()
        cy.get('#Title').type('test title')
        cy.get('#Author').type('test Author')
        cy.get('#Url').type('test Url')
        cy.contains('create').click()
      })
      it('A blog can be liked', function(){
        cy.get('#view-button').click()
        cy.get('#like-button').click()
        cy.contains('Likes: 1')
      })
      it('A blog can be deleted by its own user', function(){
        cy.get('#view-button').click()
        cy.get('#delete-button').click()
        cy.contains('test title has been deleted')
      })
      it('A blgo cannot be deleted by another user', function(){
        cy.get('#logout-button').click()

        const user = {
          name: 'Billy Bown',
          username: 'Billy',
          password: 'butts'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.contains('Login').click()

        cy.get('#username').type('Billy')
        cy.get('#password').type('butts')
        cy.get('#login-button').click()

        cy.get('#view-button').click()
        cy.get('#delete-button').should('not.exist')

      })
    })
  })
})
