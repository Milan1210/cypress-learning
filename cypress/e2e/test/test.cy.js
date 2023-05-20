describe('test calendart', () => {

  it.only("Find and print how many empty fields there are for each month", ()=>{
    cy.visit("https://neradni-dani.com/kalendar-2022-srb.php")
    cy.get("table").each($tables=>{
      cy.wrap($tables).find("thead>tr:first-child>th").then($nameOfMonth=>{
        let nameM = $nameOfMonth.text()
        cy.wrap($tables).find("tbody tr").then(rows=>{
          let numOfRows = rows.length;
          cy.wrap($tables).find("tbody td>div").then(td=>{
            let numOfFillInDays = td.length;
            cy.wrap($tables).find("tbody td").then(allDays =>{
              let allD = allDays.length;
              let emptyDays = allD-numOfFillInDays-numOfRows;
              cy.wrap(emptyDays).as('tst')
              cy.log(`The number of empty fields is ${emptyDays} for month ${nameM}`)
            })
                    
          })
        })
      })
    })
  })

  it.only("Count and print how many empty fields there are for entire year", ()=>{
    cy.visit("https://neradni-dani.com/kalendar-2022-srb.php")
    cy.get('td[class="day new"]').then($t=>{
      cy.get('td[class="day old"]').then($s=>{
        let a  = $t.length;
        let b  = $s.length;
        let c = a+b;
        cy.log(`The number of empty fields is ${c}`)
      })
    })
  });

});