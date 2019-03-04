Tripster
=====================

A collaberative, trip planning application which allows you to select flights, hotels, events and attractions as well as view other trip members selections and discuss in real-time!

Uses PostgreSQL, Express, React, NodeJS, Socket.io to create a stress-free trip planning experience with multiple API returning customized options for your selected location and dates.


### Getting Started

Clone the file, create your own git repo and install dependencies:

- `git clone <new folder>`
- `cd <new folder>`
- `npm i` from root folder
- cd into `<server>` and `npm i`

Set up database:
- access psql environment and create db using command `create database <db name> owner <user>`
- cd into server folder and `knex migrate:latest`

Register for the necessary API keys:
- [Eventbrite key](https://www.eventbrite.com/platform/)
- [Geocode key](https://opencagedata.com/)
- [Google Places key](https://cloud.google.com/maps-platform/places/)
- [Google Maps key](https://cloud.google.com/maps-platform/maps/)

Create a .env within the root folder and add the following:
```
GOOGLE_MAPS_KEY=<your google maps api key>
```

Create a .env file within `<server>` and add the following:
```
DB_HOST=localhost
DB_USER=<user>
DB_PASS=<password>
DB_NAME=<db name>
DB_SSL=true if heroku
DB_PORT=5432
GOOGLE_PLACE_KEY=<your google places api key>
EVENTBRITE_API_TOKEN=<your eventbright api key>
GEOCODE_KEY=<your geocode key>
```

Run servers:
-run `npm start` from root folder
-run `npm start` from server folder
-open browser and go to localhost:3000

### Usage
1) Enter name and email to log in
2) Either create a trip or join an existing one
   If you are organising the trip:
    - enter origin and destination
    - select desired start date and end date
    - share trip code with all other members of your trip via whatever method works best for you
    - when you are ready click start
  If you are a trip participant:
    - join trip using unique trip code that was shared with you
    - click `start` when ready to proceed
3) At each stage, select the options that work best for you and click the `ready` button when you are finished
    - Use the real-time chat to communicate your favourite options or recommend things to each other
4) Enjoy your trip !


### Dependencies

* all-the-cities
* axios
* dotenv
* dotenv-webpack
* fs
* geocoder
* google-maps-react
* react
* react-dom
* react-loading
* react-router-dom
* react-router-transition
* react-ui-cards
* scripts
* socket.io
* universal-cookie