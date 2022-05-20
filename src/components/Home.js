import React from 'react'
import { ShopItem } from './ShopItem'
import { Link } from 'react-router-dom'

export const Home = ({ shopItems, addToCart }) => {
  return (
    <div className="shopItemContainer">
      {shopItems.map((shopItem) => {
        return (
          <div key={shopItem.id}>
            <ShopItem shopItem={shopItem} addToCart={addToCart} />
          </div>
        )
      })}
    </div>
  )
}
