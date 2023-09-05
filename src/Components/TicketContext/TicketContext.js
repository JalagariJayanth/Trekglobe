import { createContext, useState } from "react";

const TicketContext = createContext()

const TicketState = props => {
    const host = "http://localhost:5000"
    const [Ticket,setTicket] = useState([])
    const [Data,setData] = useState("")

    const getTicket = async (From,To,mode) => {
        setData(mode)
        setTicket([])
        const url = `${host}/ticket/transport`
        const options = {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('jwtToken')
            },
            body:JSON.stringify({From,To,mode})
        }
        const response = await fetch(url,options)
        const result = await response.json()
        if (result.success){
            setTicket(result.data)
        }else{
            alert(result.data)
        }
        
    }


    return (
        <TicketContext.Provider value={{Data,Ticket,getTicket}}>
            {props.children}
        </TicketContext.Provider>
    )


}
export { TicketContext, TicketState };
