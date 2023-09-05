import { useState, useContext } from "react";
import { TicketContext } from "../TicketContext/TicketContext";
import "./index.css";
import { useNavigate } from "react-router-dom";

const FlightBlog = () => {
  const mode = "Flight";

  const [credentials, setCredentials] = useState({ From: "", To: "" });
  const navigate = useNavigate();
  const context = useContext(TicketContext);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    let { From, To } = credentials;
    const { getTicket } = context;
    if (localStorage.getItem("jwtToken")) {
      getTicket(From, To, mode);
      //console.log("navigating")
      navigate("/flight/search");
    }
  };

  const onChangeFrom = (event) => {
    setCredentials({ ...credentials, From: event.target.value });
  };
  const onChangeTo = (event) => {
    setCredentials({ ...credentials, To: event.target.value });
  };

  const onClickSwap = event => {
     const temp = credentials.From
     setCredentials(prevState => ({
        ...prevState,From:credentials.To,To:temp
     }))
  }

  return (
    <div className="flight-blog-main-background-container">
      <div className="flight-blog-content-container">
        <h1 className="flight-blog-content-heading">What's there</h1>
        <p className="flight-blog-content-description">
          If you wish to fly to new heights, begin by setting your sights on a
          destination<br></br> you can reach and then create a flight plan, a
          map, that will be your guide.
          <br />
          Trekglobe provides the best experience of flight journey.
        </p>
        <form onSubmit={handleSubmitForm}>
          <div className="search_input_container">
            <input
              value={credentials.From}
              onChange={onChangeFrom}
              type="text"
              className="input-field"
              placeholder="From (Enter IATA Code)"
              required
            />
            <span onClick={onClickSwap} className="input-icon">&larr;&rarr;</span>

            <input
              value={credentials.To}
              onChange={onChangeTo}
              type="text"
              className="input-field"
              placeholder="To (Enter IATA Code)"
              required
            />
            <button type="submit" className="btn-submit">
              Search
            </button>
          </div>
        </form>

        <p className="powered_by">
          powered by{" "}
          <a href="https://aviationstack.com/" target="_blank" rel="noreferrer" style={{ color: "white" }}>
            {" "}
            Aviation stack
          </a>
        </p>
      </div>
    </div>
  );
};
export default FlightBlog;
