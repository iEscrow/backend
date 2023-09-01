const express = require ('express');

const routesBankAccounts = require('./routes/bank-accounts/BankAccounts'); // import the routes
const routesBanks = require('./routes/banks/banks'); 
const routesCriptocurrencies = require('./routes/criptocurrencies/criptocurrencies'); 
const routesEscrows = require('./routes/escrows/escrows'); 
const routesOffers = require('./routes/offers/offers'); 
const routesUsers = require('./routes/users/users'); 
const app = express();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Parse request body
app.use(express.json())


app.use('/', routesBankAccounts, routesBanks, routesCriptocurrencies, routesEscrows, routesOffers, routesUsers); //to use the routes

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})