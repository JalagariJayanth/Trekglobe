import React, { useContext } from "react";

import { TicketContext } from "../TicketContext/TicketContext";
import FlightItems from "./FlightItems";
import "./index.css";

const FlightSearch = () => {
  const context = useContext(TicketContext);
  const { Ticket, Data } = context;
  const length = Ticket.length;
  const Tickets = length > 0 ? Ticket.slice(0,15) : []






  if (length === 0 || !Array.isArray(Ticket)) {
    return (
      <div className="ticket_error_main_bg_container">
        <h1>No Data available right now</h1>
        <img
          src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1693752947/unavailable_weggke.jpg"
          className="ticket_error_image"
          alt="unavailable"
        />
      </div>
    );
  } else {
    //console.log(Ticket)
    return (
      <div className="flight_search_main_container">
        <h1>{Data}s Available</h1>
        <div className="flight_items_main_container">
          {Tickets.slice(0, 15).map((Object, index) => {
            return <FlightItems key={index} Object={Object}  />;
          })}
        </div>
      </div>
    );
  }
};

export default FlightSearch;
