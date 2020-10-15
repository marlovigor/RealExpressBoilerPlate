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
        name:'wing zero',
        price: 55,
        description: 'appears in the OVA/movie Mobile Suit Gundam Wing: Endless Waltz. It is redesigned by seriess mecha designer Hajime Katoki',
        grade: 'mastergrade',
        universe: 'After Colony',
        itemimage: '',
        numberofitems: 4
      },
      {
        id: 2,
        name: 'nu gundam',
        price: 78,
        description: 'The RX-93 ν Gundam (aka Nu Gundam, Nu) is a mobile suit that appears in Mobile Suit Gundam: Chars Counterattack. It was designed and piloted by Amuro Ray',
        grade: 'mastergrade',
        universe: 'universal century',
        itemimage: '',
        numberofitems: 8
      },
    ];

    beforeEach('insert', () => {
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

  it(`responds with 400 and an error message when the 'itemid' is missing`, () => {
    return supertest(app)
      .post('/cart')
      .send({
        userid: 2,
        itemidd: 4,
      })
      .expect(400, {
        error: { message: `Missing 'itemid' in request body` }
      })
  })




})

describe('gundam delete Endpoint', function () {

  context(`Given no articles`, () => {
         it(`responds with 404`, () => {
           const gundamid = 123
           return supertest(app)
             .delete(`/cart/${gundamid}`)
             .expect(500)
         })
       })
  
 


})

describe(`PATCH `, () => {
     context(`Given no gundams`, () => {
       it(`responds with 404`, () => {
         const articleId = 123456
         return supertest(app)
           .patch(`/items/${articleId}`)
           .expect(404)
       })
     })
   })