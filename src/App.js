import './App.css'
import uniqid from 'uniqid'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { ShoppingCart } from './components/ShoppingCart'
import { NavBar } from './components/NavBar'

function App() {
  let [cartAmount, setCartAmount] = useState(0)
  let [cartItems, setCartItems] = useState([])
  let [shopItems, setShopItems] = useState([
    {
      name: '6oz Ceramic Mug',
      price: '$12.97',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTARtLrqe-rAdhh5naeXSe0XZQRHInAQJAo0g&usqp=CAU',
      id: uniqid(),
    },
    {
      name: '12oz Ceramic Mug',
      price: '$14.97',
      image: 'https://i.ebayimg.com/images/g/B9oAAOSw9jdgvpOb/s-l400.jpg',
      id: uniqid(),
    },
    {
      name: 'Black Tea, 16 bags',
      price: '$15.97',
      image:
        'https://s.cornershopapp.com/product-images/2417931.jpg?versionId=Z42g42dh16s63FGFvZBB7cpk.V7_Z1q1',
      id: uniqid(),
    },
  ])

  function addToCart(id, amount) {
    if (amount === 0) {
      return
    }

    // if cart already has at least one of this item, just change quantity
    if (cartItems.some((cartItem) => cartItem.id === id)) {
      let alreadyInCart = cartItems.find((cartItem) => cartItem.id === id)
      let index = cartItems.indexOf(alreadyInCart)

      let updatedCartItems = [...cartItems]

      updatedCartItems[index].quantity =
        updatedCartItems[index].quantity + amount

      setCartItems(updatedCartItems)
    } else {
      let shopItem = shopItems.find((shopItem) => {
        return shopItem.id === id
      })

      setCartItems([...cartItems, { ...shopItem, quantity: amount }])
    }
  }

  useEffect(() => {
    if (cartItems.length > 0) {
      setCartAmount(
        Number(cartItems.reduce((sum, current) => sum + current.quantity, 0))
      )
    }
  }, [cartItems])

  return (
    <>
      <NavBar cartAmount={cartAmount} />
      <Routes>
        <Route
          path="/"
          element={<Home shopItems={shopItems} addToCart={addToCart} />}
        ></Route>
        <Route path="cart" element={<ShoppingCart />}></Route>
      </Routes>
    </>
  )
}

export default App
