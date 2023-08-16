import { useEffect, useState } from "react"
import { Api } from "@utilities"

const useCart = () => {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    async function getCart() {
      const { cart } = await Api.getCart()
      setCart(cart)
    }
    getCart()
  }, [])

  return cart
}

export default useCart
