import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./event.css";
import { EVENT_API } from "../API_KEY";
function Event(props) {
  const [apiData, setApiData] = useState();
  const URL = `https://app.ticketmaster.com/discovery/v2/events/${props.id}.json?apikey=${EVENT_API}`;

  useEffect(() => {
    axios
      .get(URL)
      .then((respnose) => {
        setApiData(respnose.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [URL]);

  let finalImage = useMemo(() => {
    if (!apiData) {
      return " ";
    }
    return (
      apiData.images.find((a) => a.width === 1024 && a.ratio === "3_2") ||
      apiData.images[0].url
    );
  }, [apiData]);

  // let finalImage =
  //   apiData &&
  //   apiData.images.find((a) => a.width === 1024 && a.ratio === "3_2");

  // if (!apiData) {
  //   return;
  // }
  return (
    <div>
      <h1>{apiData && apiData.name}</h1>
      {/* <img src={finalImage && finalImage.url} alt="poster" /> */}
      <p>
        Event Date:{" "}
        <b>{apiData && apiData.dates && apiData.dates.start.localDate}</b>
      </p>
      <p>
        Book Tickets{" "}
        <a href={apiData && apiData.url} target="_blank" rel="noreferrer">
          {apiData && apiData.url}
        </a>
      </p>
      {/* <h3>Seat Map</h3> */}
      <div className="seatMap">
        {/* <div>
          <h3>Seat Map</h3>
        </div> */}

        <div>
          <img
            className="seatMapImg"
            src={
              (apiData && apiData.seatmap && apiData.seatmap.staticUrl) ||
              (finalImage && finalImage.url)
            }
            alt="SeatMap"
          />
        </div>
      </div>
    </div>
  );
}

export default Event;
