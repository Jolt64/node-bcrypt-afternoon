require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive')
const authCT = require("./controllers/authController")
const treasureCT = require('./controllers/treasureController')

const app = express()
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET  } = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Date is ready')
})

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24
    }
}))

app.post('/auth/register', authCT.register)
app.post('/auth/login', authCT.login)
app.get('/auth/logout', authCT.logout)

app.get('/api/treasure/dragon', treasureCT.dragonTreasure)



app.listen(SERVER_PORT, () => console.log(`${SERVER_PORT} Dragon's in the keep`))