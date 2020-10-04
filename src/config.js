require('dotenv').config()
console.log(process.env.DATABASE_URL)

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    "connectionString": (process.env.NODE_ENV === 'test')
     ? process.env.TEST_DATABASE_URL
     : process.env.DATABASE_URL,
    // DB_URL:process.env.DB_URL
    
    

    }

console.log(process.env.DATABASE_URL)