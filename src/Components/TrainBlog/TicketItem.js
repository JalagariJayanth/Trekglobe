const TicketItem = (props) => {
  const { Object } = props;
  console.log(Object)
  
    return (
     
        <div className="train_item_main_background_container">
          
          <h1 className="train_item_main_heading_train_name">{Object.name}({Object.train_num}) </h1>
                
            
              <div className="train_item_arr_dep_main_container">
                <div className="train_item_destination_points">
                  Departure - {Object.train_from},&nbsp;{Object.data.departTime}
                </div>
                <div className="train_item_destination_points">
                  Arrival - {Object.train_to},&nbsp;{Object.data.arriveTime.split(" ")[0]}
                </div>
              </div>
          
            <p>
              {Array.isArray(Object.data.classes) &&
                Object.data.classes.map((item, index) => (
                  <span key={index}>{item}&nbsp;&nbsp;</span>
                ))}
            </p>

            <button className="train_item_button">Check</button>
          
        </div>
     
    );
  
};
export default TicketItem;
