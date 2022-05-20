import React from 'react'
import { useParams } from 'react-router-dom'

export const ItemPage = ({ shopItems }) => {
  const { Item } = useParams()
  let shopItem = shopItems.find((shopItem) => shopItem.name === Item)
  let { name, price, image, id } = shopItem

  return (
    <div className="product-page-container">
      <div className="product-page-info-container">
        <h2>{name}</h2>
        <div>{price}</div>
      </div>
      <img src={shopItem.image} />
    </div>
  )
}
