import React, { useState,useEffect } from 'react'
import uuid from 'react-uuid';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import LoginForm from './LogForm'
import Cart from './Cart';
import Home from './Home';
import Header from './Header';
import Order from './Order'
import RegistrationForm from "./RegForm";


function App() {
  const [pets, setPets] = useState([]);
  const [createPets, setCreatePets] = useState([]);
  const [loading, setLoading] = useState()
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([
    { id: uuid(), name: 'admin', password: 'admin', email: 'admin@ad.ad' },
    { id: uuid(), name: 'user', password: 'user', email: 'user@Ad.as' },
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegister = (user) => {
    setUsers([
      ...users,
      { id: uuid(), name: user.username, password: user.password, email: user.email },
    ]);
  };

  const API_URL = 'https://petstore.swagger.io/v2/pet/findByStatus?status=available';

  const getPets = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setPets(data);
  };

  const addToCart = (id) => {
    const pet = pets.find((pet) => pet.id === id);
    const existingCartItemIndex = cart.findIndex((item) => item.id === id);
    if (existingCartItemIndex !== -1) {
      const newCart = [...cart];
      newCart[existingCartItemIndex].quantity++;
      setCart(newCart);
    } else {
      setCart([...cart, { id, name: pet.name, quantity: 1 }]);
    }
  };

  
useEffect(() => {
  setLoading(true)
  getPets();
  setLoading(false)


  });

function increasingInNumber(itemId) {
  setCart(prevCart => {
    const itemIndex = prevCart.findIndex(item => item.id === itemId);
    if (itemIndex >= 0) {
      const updatedItem = {...prevCart[itemIndex], quantity: prevCart[itemIndex].quantity + 1};
      const updatedCart = [...prevCart];
      updatedCart[itemIndex] = updatedItem;
      return updatedCart;
    } else {
      const newItem = {id: itemId, quantity: 1};
      return [...prevCart, newItem];
    }
  });
}

function declineInQuantity(itemId) {
  setCart(prevCart => {
    const itemIndex = prevCart.findIndex(item => item.id === itemId);
    if (itemIndex >= 0) {
      const updatedItem = {...prevCart[itemIndex], quantity: prevCart[itemIndex].quantity - 1};
      if (updatedItem.quantity <= 0) {
        const updatedCart = [...prevCart];
        updatedCart.splice(itemIndex, 1);
        return updatedCart;
      } else {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex] = updatedItem;
        return updatedCart;
      }
    } else {
      return prevCart;
    }
  });

  
}
const handleDelete = (id) => {
  setCart(cart.filter(item => item.id !== id));
}

  function AddOrder(){
    setOrder(cart)
    setCart([])
}


return (
<div>
<Router>
    <Header handleLogout ={handleLogout} isLoggedIn = {isLoggedIn}/>
    <Routes>
      <Route path="/" element={<Home getPets={getPets} pets = {pets}  isLoggedIn = {isLoggedIn} addToCart = {addToCart} />} />
      <Route path="/registration" element={<RegistrationForm onRegister={handleRegister}  isLoggedIn = {isLoggedIn}/>} />
      <Route path="/login" element={<LoginForm onLogin={handleLogin} users = {users} isLoggedIn = {isLoggedIn}/>} />
      {isLoggedIn&&<Route path="/cart" element={<Cart cart={cart} AddOrder ={AddOrder} 
      increasingInNumber = {increasingInNumber} declineInQuantity = {declineInQuantity} handleDelete ={handleDelete}  />} />}
      {isLoggedIn&&<Route path="/order" element={<Order order ={order} />} />}

      
    </Routes>
    </Router>
</div>
  );
}

export default App;