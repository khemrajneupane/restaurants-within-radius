# This project is entirely done as a backend assignment provided by Wolt Helsinki, in order to get through the summer internship 2020

# To run this project

- npm install
- nodemon index.js or
  - node_modules/.bin/nodemon index.js or
  - node index.js or
  - npm start

[Run Locally](http://localhost:3001/restaurants/search/sushi/60.17045/24.93147) : http://localhost:3001/restaurants/search/sushi/60.17045/24.93147 or http://localhost:3001/restaurants

# Technologies

- NodeJS, Express, ES6, JSX Syntaxing (Backend)
- Jest
- geolib library for distance calculation based on coordinates
- eslint for linting codes to more beautiful lookups, better readability and moulding the syntaxing to desired patterns

# Features

- Restaurant data are stored in JavaScript object module but parsed to JSON while sending
- Get all data: http://localhost:3001/restaurants or sorted data e.g.-: http://localhost:3001/restaurants/search/sushi/60.17045/24.93147
- Based on customer location, searches all the Restaurants within 3km
- Refines the search more by searching (within 3km) all the restaurants with name or tags or description matches and gives back JSON to browser

# Ten Test Suits Test

- With Jest testing library
- if the URL with correct search terms gives back the results
- if the URL with incorrect data or insufficient data does not send back results
- if the search criterias are working functions
- if the unknown location (undefined coords) does not give back results
- if the searched restaurants are within 3km radius
- if the customer location (e.g- Helsinki) is too far from Oslo, then does not send back results

###### Test Result Screen Shot

![](images/testResults.jpg)
