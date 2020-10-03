require('dotenv').config();
console.log(process.env.DB_URL)
module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  // "connectionString": process.env.DB_URL,
  "connectionString": (process.env.NODE_ENV === 'test')
     ? process.env.TEST_DATABASE_URL
     : process.env.DATABASE_URL,
}