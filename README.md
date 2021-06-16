# SpaceX Odyssey
A simple fare wallet system model

## Technology Stacks

* Javascript
* Nodejs
* Express

## Run locally

* Clone repo (https://github.com/femzy123/spacex-odyssey)[https://github.com/femzy123/spacex-odyssey]
* Install dependecies - `npm install`
* Run - `npm start`

## API Documentation

Using an API Testing tool like POSTMAN

* Get wallet balance: GET /api/v1/wallets/{id}
  - where id is the customer's id

* fund wallet: POST /api/v1/wallets
  - request body parameters: customer_id, amount
  - example: `{ "customer_id": 1, "amount": 3000 }`

* take a trip: POST /api/v1/trip
  - request body: customer_id, from, to, rocket
  - example: `{ "customer_id": 1, "from": "abuja", "to": "moon", "rocket": "falcon 9" }`
  
