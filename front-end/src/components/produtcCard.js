import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3002');


function ProductCard(props) {
  const { _id, name, img, price, sold } = props.product;
  const [itemPrice, setItemPrice] = useState(price);

  useEffect(() => {
    socket.on('increasePrice', (updatedProduct)=> {
      if(updatedProduct._id === _id) {
        setItemPrice(updatedProduct.price);
      }
    })
  }, [])

  const handleClick = (e) => {
    socket.emit('bid', {_id})
  };

  return (
    <div className="product-card">
      <div className="product-card-img-container">
        <img src={img} alt={name} />
      </div>
      <div className="product-card-content">
        <h2>{name}</h2>
        <p>R$ {itemPrice}</p>
        <button disabled={itemPrice >= 100} onClick={handleClick}>{itemPrice >= 100 ? "Arrematado" : "Dar um lance" }</button>
      </div>
    </div>
  );
}

export default ProductCard;
