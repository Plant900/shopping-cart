import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export const ShopItem = ({ shopItem, addToCart }) => {
  let { name, price, image, id } = shopItem

  let [quantity, setQuantity] = useState(0)

  function handleChange(e) {
    setQuantity(Number(e.target.value))
  }

  return (
    <div className={'shopItem'}>
      <NavLink to={`product/${name}`}>
        <img src={image} />
      </NavLink>
      <div className="shop-item-name">{name}</div>
      <div className="shop-item-price">{price}</div>
      <div className="shop-item-btn-container">
        <button onClick={() => addToCart(id, quantity)}>Add to cart</button>
        <input
          className="shop-item-quantity-pick"
          onChange={handleChange}
          type={'number'}
        ></input>
      </div>
    </div>
  )
}
