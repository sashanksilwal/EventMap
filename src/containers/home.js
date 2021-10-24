import axios from "axios";
import { useState, useEffect } from "react";
import { IP_API, EVENT_API } from "../API_KEY";
import { Link } from "react-router-dom";

import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import DetailsIcon from "@mui/icons-material/Details";
import IconButton from "@material-ui/core/IconButton";

import Typography from "@material-ui/core/Typography";
import TopBar from "../components/topBar";
import { useLocation } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  let query = useQuery();
  const urlLocation = query.get("location");
  const urlCountry = query.get("country");
  let finalImage;
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState();
  const [events, setEvents] = useState([]);
  const [cases, setCases] = useState();

  useEffect(() => {
    setLocation(urlLocation);
    setCountry(urlCountry);
  }, [urlLocation, urlCountry]);

  useEffect(() => {
    axios
      .get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${IP_API}`)
      .then(function (response) {
        setLocation(response.data.country_code);
        setCountry(response.data.country);
      })
      .catch(function (error) {
        console.log(`Error on getting the address from API ${error}`);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${location}&apikey=${EVENT_API}`
      )
      .then(function (response) {
        setEvents(response.data._embedded.events);
        console.log(
          "Should be printed only once",
          response.data._embedded.events[0]
        );
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(
        `https://api.covid19api.com/total/country/${country}/status/confirmed`
      )
      .then(function (response) {
        setCases(response.data[response.data.length - 1].Cases);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [country, location]);

  return (
    <div>
      <TopBar active={location} />
      <Typography variant="h2" align="center">
        Events
      </Typography>
      <ImageList>
        {events.map((item, i) => {
          finalImage = item.images.find(
            (a) => a.width === 305 && a.ratio === "3_2"
          );
          return (
            <ImageListItem key={item.img} cols={0.5}>
              <img src={finalImage.url} alt={item.name} loading="lazy" />
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
                    <Link to={`/event/${item.name}`}>
                      <DetailsIcon style={{ fill: "white" }} />
                    </Link>
                  </IconButton>
                }
              />
            </ImageListItem>
          );
        })}
      </ImageList>
      Number of Covid Cases: {cases}
    </div>
  );
}

export default Home;
