import axios from "axios";
import { useState, useEffect } from "react";
import { IP_API, EVENT_API } from "../API_KEY";

function Home() {
  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const [events, setEvents] = useState([]);

  axios
    .get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${IP_API}`)
    .then(function (response) {
      setLocation(response.data.country_code);
      setCountry(response.data.country);
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  useEffect(() => {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${location}&apikey=${EVENT_API}`
      )
      .then(function (response) {
        setEvents(response.data._embedded.events);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(
        `https://api.covid19api.com/live/country/south-africa/status/confirmed`
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [country, location]);

  return (
    <div>
      <h1>{location}</h1>
      {events.map((data, i) => (
        <div className="event">{data.name}</div>
      ))}
    </div>
  );
}

export default Home;
