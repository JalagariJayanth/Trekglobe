import "./index.css";

const FlightItems = (props) => {
  const { Object } = props;
  const airline = Object.airline.name;
  const arrival = Object.arrival.iata;
  const departure = Object.departure.iata;
  const date = Object.flight_date;

  //console.log(date);

  function calculateTimeDifference(startTime, endTime) {
    const startHours = parseInt(startTime.split("T")[1].substring(0, 2));
    const startMinutes = parseInt(startTime.split("T")[1].substring(3, 6));

    const endHours = parseInt(endTime.split("T")[1].substring(0, 2));
    const endMinutes = parseInt(endTime.split("T")[1].substring(3, 6));

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    let timeDiffMinutes = endTotalMinutes - startTotalMinutes;

    if (timeDiffMinutes < 0) {
      timeDiffMinutes += 24 * 60;
    }

    const timeDiffHours = Math.floor(timeDiffMinutes / 60);
    const remainingMinutes = timeDiffMinutes % 60;

    return `${timeDiffHours} hours ${remainingMinutes} minutes`;
  }

  return (
    <div>
      <div className="flight_item_main_background_container">
        <div className="flight_item_airline_heading">
          {airline} - <span className="flight_item_airline_date">{date}</span>{" "}
        </div>
        

        <div className="flight_item_arr_dep_container">
          <div className="flight_item_destination_points">
            {departure}, {Object.departure.scheduled.split("T")[1].substring(0, 5)}
          </div>

          <div className="flight_item_time_difference">
            {calculateTimeDifference(
              Object.departure.scheduled,
              Object.arrival.scheduled
            )}
          </div>
          <div className="flight_item_destination_points">
            {arrival}, {Object.arrival.scheduled.split("T")[1].substring(0, 5)}
          </div>
        </div>

        <button className="flight_item_button">VIEW PRICES</button>
      </div>
    </div>
  );
};
export default FlightItems;
