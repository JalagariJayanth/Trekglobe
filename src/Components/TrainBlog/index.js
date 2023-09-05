
import { useState,useContext } from "react";
import { TicketContext } from "../TicketContext/TicketContext";
import "./index.css"
import { useNavigate } from "react-router-dom";


const TrainBlog = () => {
    const mode = "Train"
    

    const [credentials, setCredentials] = useState({ From: "", To: ""});
    const navigate = useNavigate()
    const context  = useContext(TicketContext)

    const handleSubmitForm = event => {
        event.preventDefault()
        let {From,To} = credentials
        const { getTicket } = context
        if (localStorage.getItem("jwtToken")){
            getTicket(From, To, mode)
            console.log("navigating")
            navigate("/checkout")
        }
    }

    const onChangeFrom = (event) => {
        setCredentials({...credentials,From:event.target.value})

    }
    const onChangeTo = (event) =>{
        setCredentials({...credentials,To:event.target.value})
    }

    const onClickSwap = event => {
        const temp = credentials.From
        setCredentials(prevState => ({
           ...prevState,From:credentials.To,To:temp
        }))
     }

    


    return(
        <div className="train-blog-main-background-container">
            <div className="flight-blog-content-container">
              <h1 className="flight-blog-content-heading">See the Lands</h1>
              <p className="flight-blog-content-description">
              Trains are wonderful.... To travel by train is to see nature and human beings,<br></br> towns and churches and rivers, in fact, to see life.
                    <br></br>
                    Book all your travels smartly with TravelGo Guide.
              </p>
              <form onSubmit={handleSubmitForm}>
    <div className="search_input_container">
        <input value={credentials.From} onChange={onChangeFrom} type="text" className="input-field" placeholder="From " required />
        <span onClick={onClickSwap} className="input-icon">&larr;&rarr;</span>

        <input value={credentials.To}  onChange={onChangeTo} type="text" className="input-field" placeholder="To" required />
        <button  type="submit" className="btn-submit">Search</button>
    </div>
</form>

    
             </div>
        </div>

    )
}
export default TrainBlog