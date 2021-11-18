import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import DetailsIcon from "@mui/icons-material/Details";
import IconButton from "@material-ui/core/IconButton";

import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import "./home.css";
require("dotenv").config();
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  let query = useQuery();
  const urlLocation = query.get("location");
  const urlCountry = query.get("country");
  let finalImage;

  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [events, setEvents] = useState([]);
  const [cases, setCases] = useState();
  const [dailyCases, setDailyCases] = useState();

  useEffect(() => {
    setLocation(urlLocation);
    setCountry(urlCountry);
  }, [urlLocation, urlCountry]);

  useEffect(() => {
    axios
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_IP_API}`
      )
      .then(function (response) {
        if (location || country) {
          console.log(response.data.country, response.data.country_code);
          setLocation(response.data.country_code);
          setCountry(response.data.country);
        }
      })
      .catch(function (error) {
        console.log(`Error on getting the address from API ${error}`);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${location}&apikey=${process.env.REACT_APP_EVENT_API}`
      )
      .then(function (response) {
        if (response.data._embedded) {
          setEvents(response.data._embedded.events);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [location]);

  useEffect(() => {
    if (country !== null) {
      axios
        .get(
          `https://api.covid19api.com/total/country/${country}/status/confirmed`
        )
        .then(function (response) {
          setCases(response.data[response.data.length - 1].Cases);
          setDailyCases(
            response.data[response.data.length - 1].Cases -
              response.data[response.data.length - 2].Cases
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [country]);
  let button;
  if (country) {
    button = (
      <div className="covidCasesInfoParagraph">
        <h3>{country}</h3>
        Number of Covid Cases today: {dailyCases}
        <br />
        Total number of Covid Cases: {cases}
      </div>
    );
  } else {
    button = <></>;
  }

  return (
    <div>
      <Typography variant="h2" align="center">
        Events
      </Typography>
      {button}
      <ImageList>
        {events.map((item, i) => {
          finalImage = item.images.find(
            (a) => a.width === 305 && a.ratio === "3_2"
          );
          return (
            <ImageListItem key={item.id} cols={0.5}>
              <img src={finalImage.url} alt={item.name} loading="lazy" />
              <Link to={`/events/${item.id}`}>
                <ImageListItemBar
                  title={item.name}
                  subtitle={
                    item.info ? item.info : "Details unavailable at the moment"
                  }
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.name}`}
                    >
                      <DetailsIcon style={{ fill: "white" }} />
                    </IconButton>
                  }
                />{" "}
              </Link>
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
}

export default Home;
