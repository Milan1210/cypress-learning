import { recurse } from 'cypress-recurse'
describe('kp', () => {
  it('uci na kupujem prodajem kucati kimono i sabrati sve cene koje ima i izvuci prosek',()=>{
    cy.visit("https://novi.kupujemprodajem.com/")
    cy.get("#keywords").type('kimono{enter}')
    cy.wait(3000)
    cy.get("#keywords").should('have.value','kimono')
    let brojStranica=4;
    let ukupnaCena=0;
    let brojProizvoda=0;
    for(let i=1;i<brojStranica;i++){
      cy.visit(`https://novi.kupujemprodajem.com/pretraga?keywords=kimono&page=${i}`)
      cy.url().should('include',`page=${i}`)
      cy.get('.AdItem_price__jUgxi').each(($cena)=>{
        const euroAmount = parseInt($cena.text().replace(/[^\d,-]/g, ''), 10);
        const text = $cena.text();
        if(text.includes('€')){
          cy.request("https://api.exchangerate-api.com/v4/latest/EUR")
            .its("body")
            .then((response) => {
              const exchangeRate = response.rates.RSD; // Kurs konverzije evra u dinare
              const dinarAmount = euroAmount * exchangeRate; // Konverzija iz evra u dinare
              //cy.log(`${euroAmount} evra je ekvivalentno ${dinarAmount} dinara.`);
              ukupnaCena+=dinarAmount
              brojProizvoda++
            })
        }
      })
    }  
    cy.wait(5000).then(()=>{
      const prosek= ukupnaCena/brojProizvoda
      cy.log(`Ukupna cena proizvoda je ${ukupnaCena},a prosecna cena bi bila ${prosek.toFixed(2)} dinara!`)
    })
    
          
    
  })

  it('kp', () => {
    let article = "kimono"
    let dinari = [];
    let euro = [];
    cy.visit("https://novi.kupujemprodajem.com/")
    cy.get("#keywords").type(`${article}{enter}`)
    cy.wait(3000)
    cy.get("#keywords").should('have.value',`${article}`)
    let lastPage = 0;
    cy.get('.Pagination_pagination__81Zkn>li:last-child').as('nextPage')
          .prev()
          .invoke('text')
          .then(lastElement => lastPage = parseInt(lastElement))
          .then(()=>{
            let count = 1;
            while (count<=lastPage) {
              cy.get('.Pagination_pagination__81Zkn>li>a').contains(count).should('be.visible').click()
              cy.wait(5000)
              // cy.get('.AdItem_price__jUgxi').each(prices => {
              //   let valuta = prices.text();
              //   if (valuta.includes('€')) {
              //     cy.log(valuta)
              //   }
              // })
              count++
            }

          })
        
  });

  it.only('kp', () => {
    let article = "kimono"
    let dinari = [];
    let euro = [];
    cy.visit("https://novi.kupujemprodajem.com/")
    cy.get("#keywords").type(`${article}{enter}`)
    cy.wait(3000)
    cy.get("#keywords").should('have.value',`${article}`)
    let lastPage = 0;
    cy.get('.AdItem_price__jUgxi').each(prices => {
      let valuta = prices.text();
      if (valuta.includes('€')) {
        cy.log(valuta)
      }
    })
        
  });
});