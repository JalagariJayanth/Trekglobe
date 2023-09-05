import React, { useContext } from 'react'

import { TicketContext } from '../TicketContext/TicketContext';
import TicketItem from './TicketItem';
import "./index.css"

 const Checkout = (props) => {
    const context = useContext(TicketContext);
    const { Ticket, Data } = context
    console.log(Ticket)
    if (Ticket.length === 0 || !Array.isArray(Ticket)) {
        return (
            <div className="ticket_error_main_bg_container">
            <h1>No Data available right now</h1>
            <img
              src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1693752947/unavailable_weggke.jpg"
              className="ticket_error_image"
              alt="unavailable"
            />
          </div>
        )
    }
    else {
        console.log(Ticket)
        return (
        <div className='train_item_main_container' style={{ backgroundColor: "#f8fef8" }}>
            <h1>{Data}s Available</h1>
            <br></br>
            <div className='train_items_main_container'>
            {Ticket.slice(0, 20).map((Object) => {
                return <TicketItem key={Object.name} Object={Object} />
            })}
            </div>
        </div>
        )
    }
    
}
export default Checkout