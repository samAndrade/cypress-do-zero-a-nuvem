/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preencher os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    cy.get('#firstName').type('Thiago')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('teste@gmai.com')
    cy.get('#open-text-area').type('Apenas realizando testes na digitação do texto referente ao curso Cypress da Udemy!', { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success > strong').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })


  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get('#firstName').type('Fernando')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('teste_gmail.com')
    cy.get('#open-text-area').type('Apenas realizando testes na digitação do texto referente ao curso Cypress da Udemy!', { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')

  })

  it('campo telefone continua vazio quando preenchido com um valor não númerico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('#firstName').type('Fernando')
    cy.get('#lastName').type('Costa')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#open-text-area').type('Curso Cypress Udemy!')
    cy.get('#phone-checkbox').check()
    cy.contains('Enviar').click()

    cy.get('.error > strong').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })


  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Fernando')
      .should('have.value', 'Fernando')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Costa')
      .should('have.value', 'Costa')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@gmail.com')
      .should('have.value', 'teste@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('92981924447')
      .should('have.value', '92981924447')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('Curso Cypress Udemy!')
      .should('have.value', 'Curso Cypress Udemy!')
      .clear()
      .should('have.value', '')
    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.clock()

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')

  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Leal')
    cy.get('#email').type('teste@gmai.com')
    cy.get('#open-text-area').type('Curso Udemy', { delay: 0 })
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Leal')
    cy.get('#email').type('teste@gmai.com')
    cy.get('#open-text-area').type('Curso Udemy', { delay: 0 })
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Leal')
    cy.get('#email').type('teste@gmai.com')
    cy.get('#open-text-area').type('Curso Udemy', { delay: 0 })
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('marca o tipo de atendimento "Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada  tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos os checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should("not.be.checked")
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('exampleFile')
    cy.get('#file-upload')
      .selectFile('@exampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'Treinamento de Cypress da Udemy.')
      .should('have.value', 'Treinamento de Cypress da Udemy.')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })

  it('exibe o gato oculto da aplicação', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
  })

})
