import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
export default function Home({ getPets, pets, isLoggedIn,addToCart}) {
  
  useEffect(() => {
    getPets();
    });

    const result = pets.map((pet) => { 
        return (
            <div key={pet.id}>
                <h1>{pet.name}</h1>
                {isLoggedIn&&<button onClick={() =>addToCart(pet.id)}>Добавить в корзину</button>}
            </div>
        )
    });
    
    return (
    <div>
      <h1>sdf</h1>
        {result}
    </div>
  );
}