import React, { useState } from 'react'
import dosa from "./assets/dosa.jpeg"
import idly from "./assets/idly.jpg"
import pongal from "./assets/Pongal.jpg"
import parota from "./assets/parota.jpg"
import chickenbiriyani from "./assets/chicken biriyani.jpeg"
import vegmeals from "./assets/vegmeals.jpeg"
import idiyappam from "./assets/idiyappam.jpg"
import friedrice from "./assets/friedrice.jpg"
import noodles from "./assets/noodles.jpg"
import { useNavigate } from 'react-router-dom';
import './Menu.css';

export default function Menu() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate()
    const menuCard=[
        {
            name:"Dosa",
            price:20,
            image:dosa
        },
        {
            name:"Idly",
            price:10,
            image:idly
        },
        {
          name:"Pongal",
            price:30,
            image:pongal
        },
        {
          name:"Parota",
            price:20,
            image:parota
        },
        {
          name:"Hyderbad Chicken Biriyani",
            price:100,
            image:chickenbiriyani
        },
        {
          name:"Veg-Meals",
            price:80,
            image:vegmeals
        },
        {
          name:"Idiyappam",
            price:50,
            image:idiyappam
        },
        {
          name:"Fried Rice",
            price:70,
            image:friedrice
        },
        {
          name:"Fried Rice",
            price:70,
            image:friedrice
        },
        {
          name:"Fried Rice",
            price:70,
            image:friedrice
        },
        {
          name:"Noodles",
            price:80,
            image:noodles
        }
    ]
    const [count,setCount]=useState(Array(menuCard.length).fill(0))
    const [cart,setCart]=useState([])
    const handleIncrease=(index)=>{
      const newCount=[...count]
      newCount[index]++
      setCount(newCount)
    }
     const handleDecrese=(index)=>{
      const newCount=[...count]
      if(newCount[index]>0){
      newCount[index]--
      }
      setCount(newCount)
    }
    
      const addToCart=()=>{
      const selectedItems=menuCard.map((item,index)=>({
        ...item,
        quantity:count[index]
      })).filter(item=>item.quantity>0)
      setCart(selectedItems)
      alert("Your food items added in the cart")
      navigate('/confirmation', { state: { cart: selectedItems } });
    }
    
  return (
    <div className='Menu'>
      {user && (
  <div className="profile-icon" onClick={() => navigate('/profile')}>
    👤
  </div>
)}

      <h1 className="love-heading">Venmathi's Restaurant 💗</h1>

        {menuCard.map((menu,index) => (
            <div className="card" key={index} >
            <img src={menu.image} alt={menu.name} />
            <p>{menu.name}</p>
            <p>₹{menu.price}</p>
            <div>
              <button onClick={()=>handleDecrese(index)}>-</button>
              <span>{count[index]}</span>
              <button onClick={()=>handleIncrease(index)}>+</button>
            </div> 
            </div>  
        ))}
        <div className="add-to-cart-container">
          <button onClick={addToCart}>Add to cart</button>
        </div>
        <div>
          {cart.length>0 && (
            <div>
              <h1>Cart items</h1>
              <ul>
                {cart.map((item,index)=>(
                  <li key={index}>
                    {item.name}*{item.quantity}=₹{item.quantity*item.price}<br/>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        </div>
      
    
  )
}


