import React, { useState } from 'react'
import uuid from 'react-uuid';
import LoginForm from './LoginForm'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Cart from './Cart';
import Home from './Home';
import Header from './Header';
import RegForm from "./RegForm";


function App() {
  const [pets , setPets] = useState([]);
  const [initPets , setInitPets] = useState([]);
  const [cart , setCart] = useState([]);
  const [order , setOrder] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([
    {id:uuid(),name: 'admin', password: 'admin', email: 'admin@ad.ad'},
    {id:uuid(),name: 'user', password: 'user', email: 'user@Ad.as'},

  ]);
  
  const handleLogin = () => {
    setIsLoggedIn(true);

  };

  const handleLogout = () => {
    setIsLoggedIn(false);


  };

  const handleRegister = (user) => {

    setUsers([...users, {id:uuid(),name: user.username, password: user.password, email: user.email}]);

  };



const API_URL = 'https://petstore.swagger.io/v2/pet/findByStatus?status=pending';

const getPets = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  setPets(data);
};
  

  function addToCart(id) {
    const pet = pets.find((pet) => pet.id === id);
    const existingCartItemIndex = cart.findIndex((item) => item.id === id);
    if (existingCartItemIndex !== -1) {
      const newCart = [...cart];
      newCart[existingCartItemIndex].quantity++;
      setCart(newCart);
    } else {
      setCart([...cart, { id, name: pet.name, quantity: 1 }]);
    }
  }





return (
<div>
<Router>
    <Header handleLogout ={handleLogout} isLoggedIn = {isLoggedIn}/>
    <Routes>
      <Route path="/" element={<Home getPets={getPets} pets = {pets}  isLoggedIn = {isLoggedIn} addToCart = {addToCart}/>} />
      {isLoggedIn&&<Route path="/cart" element={<Cart cart ={cart}  isLoggedIn = {isLoggedIn}/>} />}
      <Route path="/registration" element={<RegForm onRegister={handleRegister}  isLoggedIn = {isLoggedIn}/>} />
      <Route path="/login" element={<LoginForm onLogin={handleLogin} users = {users} isLoggedIn = {isLoggedIn}/>} />
      <Route path="/cart" element={<Cart cart={cart}/>} />
      
    </Routes>
    </Router>
</div>
  );
}

export default App;