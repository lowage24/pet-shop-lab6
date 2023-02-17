import React from 'react';

export default function Cart({cart, setCart}) {
    return (
        <div>
            <h1>Cart</h1>
            {cart.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
          </li>
        ))}
        </div>
    )
}