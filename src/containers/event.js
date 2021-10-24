// import Grid from "@material-ui/core/Grid";

//  <div>
//    <TopBar />

//    <Typography variant="h4" align="center">
//      We provide you with the latest events in your area.
//    </Typography>
//    <Grid container spacing={2}>
//      {events.map((data, i) => {
//        finalImage = data.images.find(
//          (a) => a.width === 305 && a.ratio === "3_2"
//        );

//        return (
//          <Grid item xs={3}>
//            <div className="event">
//              <Grid item align="center">
//                <section>
//                  <img
//                    className="eventImage"
//                    src={finalImage.url}
//                    alt="the event"
//                  ></img>
//                  <strong className="title">{data.name}</strong>
//                </section>
//                <p>
//                  Tickets: {data.dates.start.localDate}{" "}
//                  {data.dates.start.localTime}{" "}
//                </p>
//                <p>{data.dates.timezone}</p>
//                <p>{data.promoter.name}</p>
//                Tickets:
//                <a href={data.url} target="_blank" rel="noreferrer">
//                  {data.dates.status.code}
//                </a>
//              </Grid>
//              <p>
//                Info :{" "}
//                {data.info ? data.info : "Details unavailable at the moment"}
//              </p>
//            </div>
//          </Grid>
//        );
//      })}
//    </Grid>
//  </div>

import React from "react";

function Event(props) {
  return <h1>Hello {props}</h1>;
}

export default Event;
