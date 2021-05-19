require('dotenv').config()
console.log(process.env.DATABASE_URL,"2")

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL:process.env.DATABASE_URL,
    "connectionString": (process.env.NODE_ENV === 'test')
     ? process.env.TEST_DATABASE_URL
     : process.env.DATABASE_URL,
    // DATABASE:process.env.DATABASE_URL
    
    

    }

console.log(process.env.DATABASE_URL,"3")