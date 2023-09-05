import Carousel from "../Carousel"
import CitiesCarousels from "../CitiesCarousels"
import Footer from "../Footer"
import Reviews from "../Reviews"
import TravelNavItems from "../TravelNavItems"
import { Outlet } from "react-router-dom"

const Home = () => {
    return(
        <>
        <Carousel />
        <CitiesCarousels />
        <TravelNavItems />
        <Outlet />
        <Reviews />
        <Footer />
        </>
    )
}
export default Home