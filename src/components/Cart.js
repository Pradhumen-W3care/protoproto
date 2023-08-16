import React, { useState, useEffect, useContext } from "react"
import { Api } from "@utilities"
import { navigate } from "gatsby"
import { myContext } from "../context/provider"


// import Button from "@components/Button"
// import SideBar from "./Checkout/SideBar"


const productRender = (newCart, siteCart, setSiteCart) => {
  const { currencys } = useContext(myContext)
  let products = newCart.lineItems.map((el, i) => {
    return {'id': el.purchasableId}
  })
  const minus = async (Id, qty) => {
    let purchasables = {
      lineItems: {
        [Id]: {
          qty: qty-1,
        },
      },
    }
    // purchasables.push({'id': Id, 'qty': '-1'})
    // Add a new line item to the cart
    try {
      const { success, errors, cart } = await Api.updateCart(
        purchasables
      )
      setSiteCart(cart)

    } catch (err) {
      // Todo, handle the request error
    }
  }
  const plus = async (Id) => {
    let purchasables = []
    purchasables.push({'id': Id})
    // Add a new line item to the cart
    try {
      const { success, errors, cart } = await Api.updateCart({
        purchasables
      })
      setSiteCart(cart)

    } catch (err) {
      // Todo, handle the request error
    }
  }
  return (
    <div>
      {newCart.lineItems.map(
        (el, i) => {
          return (
            <div
              key={i}
              className=""
            >
              <div
                className=""
              >
                <div className="font-semibold mb-5">
                  {el.description}
                </div>
                <div className="flex w-full justify-between mb-3">
                  <div>
                    <span>Price: {currencys == "EUR" ? `€ ` : currencys == "USD" ? `$ `:currencys == "AUD" ? `A$ `:''}{el.price}</span>
                  </div>
                  <div>
                    <span>Total: {currencys == "EUR" ? `€ ` : currencys == "USD" ? `$ `:currencys == "AUD" ? `A$ `:''}{el.subtotal}</span>
                  </div>
                </div>
                <div
                  className="flex w-full justify-between items-center">
                    <button
                      className="w-14 h-14 rounded-md bg-grey"
                    onClick={
                      ()=> {
                        minus(el.id, el.qty)
                      }
                    }
                    >-</button>
                    {el.qty}
                    <button
                      className="w-14 h-14 rounded-md bg-grey"
                      onClick={
                      ()=> {
                        plus(el.purchasableId)
                      }
                    }>+</button>
                </div>
              </div>
              <hr className="h-1 my-10"/>
            </div>
          )
        })
      }
      <div className="my-5 font-bold">Total: {currencys == "EUR" ? `€ ` : currencys == "USD" ? `$ `:currencys == "AUD" ? `A$ `:''}{newCart.total}</div>

    </div>
  )
}

const Cart = () => {
  const { siteCart, setSiteCart } =   
    useContext(myContext)
  const navigateToCheckout = cart => navigate("/checkout", { state: { cart } })
  const [count, setCount] = useState(siteCart);
  useEffect(()=> {
    setCount(siteCart)
  }, [siteCart])

  return (
    <div
      className="testtest cart-block absolute border-black bg-white text-black right-0 w-full max-w-screen-sm text-lg p-10 border-2 border-black max-h-704 overflow-scroll"
    >
      <h2
      className="font-bold mb-10"
      >Your Cart</h2>
      {(count !== false && count.lineItems.length>0) ?
        productRender(count, siteCart, setSiteCart) : <div className="mb-10"><p>Your cart is empty</p></div>
      }

      <button
        onClick={() =>
          navigateToCheckout(count)
        }
        className="btn-pri w-full"
      >
        Buy now
      </button>
    </div>
  )
}

export default Cart
