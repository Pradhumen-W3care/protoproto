import React, { useContext, useState } from "react"

import Button from "@components/Button"
import { myContext } from "../../context/provider"

/**
 * SideBar component
 */
const SideBar = ({ cart, onLineItemUpdate }) => {
  const {
    lineItems: [lineItem],
  } = cart

  const [qty, setQty] = useState(lineItem.qty)
  const { currencys } = useContext(myContext)
  return (
    <div>
      <h2 className="font-bold mb-3">Order Summary</h2>
      {cart.lineItems.map(
        (el, i) => {
          return (
            <div>
              <div className="mb-4">
                <div className="mb-3">{el.description}</div>
              </div>

              {el?.productThumbnail?.url && (
                <>
                  <img
                    className="mb-4 lg:mb-0"
                    src={el?.productThumbnail?.url}
                    alt={el?.productThumbnail?.title}
                  />
                  <div className="hidden lg:block italic w-3/4 leading-normal">
                    {el.description}
                  </div>
                </>
              )}

              <div className="flex flex-wrap -mx-2">
                <div className="w-full lg:w-1/2 xl:w-1/4 px-2 mb-4">
                  <label className="block">Quantity</label>
                  <div>{el.qty}</div>

                  {/*<input*/}
                  {/*  className="w-full text-sm bg-gray-100 rounded px-3 py-3 outline-0 text-black"*/}
                  {/*  type="number"*/}
                  {/*  value={el.qty}*/}
                  {/*  onChange={e => {*/}
                  {/*    setQty(e.target.value)*/}
                  {/*  }}*/}
                  {/*/>*/}
                </div>

                {/*<div className="w-full px-2">*/}
                {/*  <Button*/}
                {/*    onClick={() => {*/}
                {/*      onLineItemUpdate({*/}
                {/*        id: el.id,*/}
                {/*        qty,*/}
                {/*      })*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    Update*/}
                {/*  </Button>*/}
                {/*</div>*/}
              </div>
              <hr className="text-grey-light my-8" />
            </div>
        )
        }
      )}
      <div>Total:</div>
      <div>{currencys == "EUR" ? `€ ` : currencys == "USD" ? `$ `:currencys == "AUD" ? `A$ `:''}{cart.itemSubtotal}</div>

    </div>
  )
}

export default SideBar
