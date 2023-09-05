import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import {FaPlane} from "react-icons/fa"
import {FaBusSimple} from "react-icons/fa6"

const TravelNavItems = () => {
    const [active, setActive] = useState("flight");

    const onClickItem = (item) => {
        setActive(item);
    };

    const getBackgroundColor = (item) => {
        return active === item ? "blue" : "white";
    };

    const getColor = (item) => {
        return active === item ? "white" : "blue";
    };

    return (
        <div className="travel_nav_items_main_container">
            <Link to="/" onClick={() => onClickItem("flight")}   className="item-container" style={{ backgroundColor: getBackgroundColor("flight"), color: getColor("flight") }}>
                 <FaPlane className="icons"/>
            </Link>
            <Link to="/trains" onClick={() => onClickItem("train")} className="item-container" style={{ backgroundColor: getBackgroundColor("train"), color: getColor("train") }}>
                <FaBusSimple className="icons" />
                </Link>
            
        </div>
   
    );
};

export default TravelNavItems;
