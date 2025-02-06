import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useEffect, useState } from "react"
import { db } from './data/db'

function App() {

  const initialCart = JSON.parse(localStorage.getItem('cart')) || []
  
  // State
  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)
  
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  function addToCart(item) {

    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)

    if (itemExist >= 0) {

      if (cart[itemExist].quantity >= MAX_ITEMS) return

      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function addQuantityToItem(id) {
    const updatedCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1
        }
      }
      return guitar
    })
    setCart(updatedCart)
  }

  function subtractQuantityToItem(id) {
    const updatedCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1
        }
      }
      return guitar
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  return (
    <>
      
      <Header
        cart = {cart}
        removeFromCart = {removeFromCart}
        addQuantityToItem = {addQuantityToItem}
        subtractQuantityToItem = {subtractQuantityToItem}
        clearCart = {clearCart}
      />  

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {data.map((guitar) => (
                <Guitar
                  key={guitar.id}
                  guitar = {guitar}
                  setCart = {setCart}
                  addToCart = {addToCart}
                />
              ))
            }
          </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
     
    </>
  )
}

export default App
