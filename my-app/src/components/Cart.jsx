import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

function Cart({cart, AddOrder ,increasingInNumber, declineInQuantity,handleDelete}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/order");
      };
    
    return (
        <div>
            <h1>Cart</h1>
            {cart.map((item) => (
          <li key={item.id}>
          {item.name} ({item.quantity})
            <button onClick={()=>{increasingInNumber(item.id)}}>+</button>
            <button onClick={()=>{declineInQuantity(item.id)}}>-</button>
            <button onClick={()=>{handleDelete(item.id)}}>Удалить</button>

        </li>
        ))}
        <button onClick={()=>{AddOrder();handleClick()}}>Добавить в лист заказов</button>
        </div>
    )
}


export default Cart;
