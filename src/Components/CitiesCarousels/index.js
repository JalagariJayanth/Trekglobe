import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CitiesData from "./CitiesData";
import CityItem from "../CityItem";
import "./index.css"
const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const CitiesCarousels = () => {
    return (
        <div className="city-carousel-background-container">
           <div className="city-carousel-main-container">
         <h1 className="city-carousel-main-heading">Explore India</h1>
         <p className="city-carousel-description">These popular destinations have a lot to offer</p>
         <Carousel responsive={responsive}>
            {CitiesData.map((each,index) => (
                <CityItem key={index} details={each} />
            )
            )}
         </Carousel>
         </div>
           
        </div>
    )

}
export default CitiesCarousels
  
