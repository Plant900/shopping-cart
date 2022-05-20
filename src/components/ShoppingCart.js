import React from 'react'
import { useState } from 'react'

export const ShoppingCart = ({ cartItems, changeItemQuantity, removeItem }) => {
  let [value, setValue] = useState(0)

  function handleChange(e) {
    setValue(e.target.value)
  }

  return cartItems.map((cartItem) => {
    return (
      <div className="cart-item" id={cartItem.id}>
        <img src={cartItem.image} />
        <div className="cart-item-name">{cartItem.name}</div>
        <div className="cart-item-price">
          {`$
          ${
            Math.round(cartItem.pricedata * Number(cartItem.quantity) * 100) /
            100
          }`}
        </div>
        <input
          type="number"
          value={cartItem.quantity}
          onChange={(e) => {
            handleChange(e)
            changeItemQuantity(cartItem.id, value)
          }}
        ></input>
        <button onClick={() => removeItem(cartItem.id)}>Remove</button>
      </div>
    )
  })
}
