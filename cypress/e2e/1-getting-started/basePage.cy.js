/// <reference types="cypress" />



describe('Basic profile ', () => {
  beforeEach(() => {
 
    // Cypress.Commands.add("navigateToLanding", () => {
    //   cy.readFile("config.json").then((config) => {
       
    //   });

      const username ="auditwin";
      const password = "RemoteIngolstadt20Paris20";
  
      const url = `https://${username}:${password}@staging.digitaltwin.audi`;
      cy.visit(url);
      cy.get("#locale-selector").select("en-GB")
      cy.get('[data-testid="submit-button"]').click()
      cy.get('[id="ensCancelText"]').click()
      cy.get('[data-testid="login-button"]').click()
  
      cy.origin("https://identity-sandbox.vwgroup.io/signin-service/v1/signin/",()=>{
      cy.get('[name="email"]').type("portal_ku03@v11.co")
      cy.get("#next-btn").click()
      cy.get('#password').type("Test1234.")
      cy.get("#next-btn").click()
  
  
      })
      cy.wait(8000)

      cy.get('[data-vin="BAUVSLF2117091908"]').contains("To the profile")
      .should("be.visible")
      .click()

  })

  it('Check links and buttons', () => {
    
   //user check
    cy.get('[data-testid="header-username"]').should("be.visible").and('have.text','Amalia')
    //title ckeck
    cy.get('[data-testid="page-title"]').should("be.visible").and('have.text','Basic profile')
    //report link
    cy.get('[data-testid="download-basic-report-button"]').should("be.visible")
    //price check
    cy.get('[data-testid="price-tag-for-premium"]').contains("99,96").should("be.visible")
    // check deal ofer link
    cy.get('[data-testid="visit-dealer-offer-button"]').click()
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/dealer/QkFVVlNMRjIxMTcwOTE5MDg=')

      })
    cy.get('[data-testid="banner-title"]').should("be.visible").and('have.text','Dealer offer')
    cy.get('[data-testid="back-button"]').click()
    //check premium flag
    cy.get('[data-testid="premium-flag"]').should('have.class','premium-flag')


  })

  it('Check footer', () => {

    
    cy.get('[data-testid="legal-notice-button"]').click()
    cy.get('#Legal').should('have.text','Legal notice')
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/hub/QkFVVlNMRjIxMTcwOTE5MDg=')
      })
    cy.get('[data-testid="legal-text-close-button"]').click()



    cy.get('[data-testid="privacy-button"]').click()
    cy.get('#Privacy').should('have.text','Privacy policy')
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/hub/QkFVVlNMRjIxMTcwOTE5MDg=')
      })
    cy.get('[data-testid="legal-text-close-button"]').click()



    cy.get('[data-testid="cookie-policy"]').click()
    cy.get('#Policy').should('have.text','Cookie policy')
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/hub/QkFVVlNMRjIxMTcwOTE5MDg=')
      })
    cy.get('[data-testid="legal-text-close-button"]').click()

 

    cy.get('[data-testid="contact-button"]').click()
    cy.get('#Contact').should('have.text','Contact')
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/hub/QkFVVlNMRjIxMTcwOTE5MDg=')
      })
    cy.get('[data-testid="legal-text-close-button"]').click()



    cy.get('[data-testid="terms-and-conditions-button"]').click()
    cy.get('#TnC').should('have.text','Terms of use')
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/hub/QkFVVlNMRjIxMTcwOTE5MDg=')
      })
    cy.get('[data-testid="legal-text-close-button"]').click()

    cy.get('[data-testid="cookie-modal"]').click()
    cy.get('#ensTitle').should('have.text','Cookie settings')
    cy.get('#ensCancel').should('exist')
    cy.get('#ensSave').should('exist')
    cy.get('#btn-close-modal-header').should('be.visible').click()

    
  })

    it('Check User and Vehicls api', () => {
      cy.request('https://staging.digitaltwin.audi/auth/oauth/userinfo').as('todoRequest');
      cy.get('@todoRequest').then(todos => {
          expect(todos.status).to.eq(200);
          expect(todos.body["givenName"]).to.eq("Amalia");
          cy.log(todos.body["givenName"])
      });



      cy.request('https://staging.digitaltwin.audi/api/v1/vehicle/vehicles').as('todoRequest');

      var detailes = []
      cy.get('@todoRequest').then(todos => {
          expect(todos.status).to.eq(200);
          expect(todos.body.length).to.eq(22);
          todos.body.forEach(car => {

            if(car["vin"]== "BAUVSLF2117091908"){
              detailes.push(car)
              expect(car["accessible"]).to.be.true
              expect(car["isEligible"]).to.be.true
            }
            
          });

      
       
      });
    })


 
})
  