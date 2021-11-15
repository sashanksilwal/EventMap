# EventMap

Web app that display events happening and Covid-19 statistics around the user’s location.

handled front-end interface through *React* (implementing Routers, hooks) and *MaterialUI*, and API calls using *Axios*.

 The project uses three differnt APIs:
 
 - [Ticketmaster](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/)
 - [Covid19Api](https://covid19api.com)
 - [ip location](https://ipgeolocation.io)


Existing API Endpoints

##### An API Of Events
- Base URL - [https://app.ticketmaster.com/discovery/v2/events.json](https://app.ticketmaster.com/discovery/v2/events.json)

   HTTP Verb | Endpoint | Description
   ----------|----------|------------
    `GET`    | /countryCode | get all events in a particular country
 

##### An API Of Covid Stats
- Base URL - [https://api.covid19api.com/](https://api.covid19api.com/)

   HTTP Verb | Endpoint | Description
   ----------|----------|------------
    `GET`    | /total/country/  | get covid stats for particular country
 
    
    ##### An API to extract iP address of user
    
- Base URL - [https://ipgeolocation.abstractapi.com/v1/](`https://ipgeolocation.abstractapi.com/v1/)

   HTTP Verb | Endpoint | Description
   ----------|----------|------------
    `GET`    | /api_key | returns details of the users location
   

 
