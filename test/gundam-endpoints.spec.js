const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('gundam Endpoints', function () {

    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('items').truncate())

    context('Given there are items in the database', () => {
             const testUnits = [
               {
                 id: 1,
                 name: 'wing zero',
                 price: 55,
                 description: 'appears in the OVA/movie Mobile Suit Gundam Wing: Endless Waltz. It is redesigned by seriess mecha designer Hajime Katoki',
                 grade: 'mastergrade',
                 universe: 'After Colony',
                 itemimage:'',
                 numberofitems: 4
                },    
               {
                id: 2,
                name: 'nu gundam',
                price: 78,
                description: 'The RX-93 ν Gundam (aka Nu Gundam, Nu) is a mobile suit that appears in Mobile Suit Gundam: Chars Counterattack. It was designed and piloted by Amuro Ray',
                grade: 'mastergrade',
                universe: 'universal century',
                itemimage:'',
                numberofitems: 8
               },
             ];
        
             beforeEach('insert units', () => {
               return db
                 .into('items')
                 .insert(testUnits)
             })

             it('GET /items responds with 200 and all of the units', () => {
                     return supertest(app)
                       .get('/inventory')
                       .expect(200)
                       // TODO: add more assertions about the body
                   })
           })


})