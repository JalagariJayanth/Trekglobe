import "./index.css"

const CityItem = props => {
    const {details} = props
    const {name,description,image_url,explore_link} = details

    const projectStyle = {
        backgroundImage: `url(${image_url})`,
        backgroundSize: "cover",
        width: "300px",
        height: "220px",
        marginLeft:"5px",
        marginRight:"5px",
        padding:"18px",
        color:"#ffffff"
      };


    return(
      <div className="card-container">
           <div className="carousel_card_container" style={projectStyle}>
                <h5>{name}</h5>
                <p>{description}</p>
           </div>
           <button className="explore_button"><a className="hyper_link_carousel" href={explore_link} target="_blank" rel="noreferrer">Explore</a></button>
      </div>
    )
}
export default CityItem