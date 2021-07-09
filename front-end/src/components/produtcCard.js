import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3002');


function ProductCard(props) {
  const { _id, name, img, price, sold } = props.product;
  const [itemPrice, setItemPrice] = useState(price);
  const [isSold, setIsSold] = useState(sold);
  console.log('itemPrice: ', itemPrice);
  console.log('isSold: ', isSold);


  useEffect(() => {
    socket.on('increasePrice', (updatedProduct)=> {
      if(updatedProduct._id === _id) {
        setItemPrice(updatedProduct.price);
        setIsSold(updatedProduct.sold);
      }
    })
  }, [])

  const handleClick = (e) => {
    socket.emit('bid', {_id})
  };

  return (
    <div>
      <h2>{name}</h2>
      <img src={img} alt={name} />
      <p>R$ {itemPrice}</p>
      <button disabled={isSold} onClick={handleClick}>{ isSold ? "Arrematado" : "Dar um lance" }</button>
    </div>
  );
}

export default ProductCard;
