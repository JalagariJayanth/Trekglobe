import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import ProtectedRoute from "./Components/ProtectedRoute";
import FlightBlog from "./Components/FlightBlog";
import  Checkout from "./Components/TrainBlog/CheckOut";
import FlightSearch from "./Components/FlightBlog/FlightSearch";
import TrainBlog from "./Components/TrainBlog";

const App = () =>{
     return(
     <BrowserRouter>
      <Navbar />
      <Routes> 
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/resetpassword/:token" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<Home/>}>
              <Route path="" element={<FlightBlog/>} />
              <Route path="trains" element={<TrainBlog/>} />
            </Route>
            
        </Route>
        <Route exact path="/checkout" element={<Checkout/>} />
        <Route exact path="/flight/search" element={<FlightSearch />} />
      </Routes>
      </BrowserRouter>
  
)}

export default App;
