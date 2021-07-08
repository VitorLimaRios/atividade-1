import React from 'react';

function productCard(props) {
  const { id, name, img, price, sold } = props.product;
  return (
    <div>
      <h2>{name}</h2>
      <img src={img} alt={name} />
      <p>R$ {price}</p>
      <button disabled={sold}>{ sold ? "Arrematado" : "Dar um lance" }</button>
    </div>
  );
}

export default productCard;
