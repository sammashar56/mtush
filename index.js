const pesa = require("mpesa-api");
const prettyjson = require('prettyjson');
//
const bodyParser = require('body-parser')
const Mpesa = require("mpesa-api").Mpesa;

const express = require('express');
const app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/hooks/mpesa', (req, res) => {
  console.log('-----------Received M-Pesa webhook-----------');
	
  // format and dump the request payload recieved from safaricom in the terminal
  console.log(prettyjson.render(req.body, options));
  console.log('-----------------------');
	
  let message = {
	  "ResponseCode": "00000000",
	  "ResponseDesc": "success"
	};
	
  // respond to safaricom servers with a success message
  res.json(message);
});

const environment = "sandbox";

const credentials = {
    client_key: '0RGHzIroL4BD6948GeF2mHI3XVlVYxCp	',
    client_secret: 'JER2Plhmh6hPJHDv',
    initiator_password: 'Safcom120!',
    certificatepath: null
};


 
// create a new instance of the api
const mpesa = new Mpesa(credentials, environment);

mpesa
  .lipaNaMpesaOnline({
    BusinessShortCode: 174379,
    Amount: 1 /* 1000 is an example amount */,
    PartyA: '254713531902',
    PhoneNumber: '254713531902',
    CallBackURL: "http://1ac0e2d4.ngrok.io/hooks/mpesa",
    AccountReference: "Account Reference mtush",
    passKey: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
    TransactionType: "CustomerPayBillOnline" /* OPTIONAL */,
    TransactionDesc: "aluta" /* OPTIONAL */
  })
  .then(response => {
    //Do something with the response
    //eg
    console.log(response);
  })
  .catch(error => {
    //Do something with the error;
    //eg
    console.error(error);
  });

const server = app.listen(5000, () => {
let host = server.address().address;
let port = server.address().port;
console.log(`server listening on port ${port}` );
});