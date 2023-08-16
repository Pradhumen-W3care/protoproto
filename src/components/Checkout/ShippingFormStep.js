import React, { useMemo } from "react"
import { Puff } from "svg-loaders-react"

import { isAddressValid } from "@utilities"

const ShippingFormStep = ({
  shippingMethodHandle,
  cart,
  onChange,
  onSubmit,
  setActive,
  loading = false,
  active = false,
}) => {
  // Render addresses from the cart
  const { availableShippingMethodOptions } = cart

  const shippingOptions = useMemo(() => {
    const shippingOptions = []
    for (const [, value] of Object.entries(availableShippingMethodOptions)) {
      shippingOptions.push(value)
    }
    return shippingOptions
  }, [availableShippingMethodOptions])

  const selectedShippingOption = shippingMethodHandle
    ? availableShippingMethodOptions[shippingMethodHandle]
    : null

  return (
    <div className="py-6 lg:p-10 lg:pt-8 border-b border-solid border-grey-light">
      <div className="flex items-center mb-4">
        <div className="border-2 border-solid border-red-commerce py-2 px-3 rounded-full font-bold mr-2 text-red-commerce">
          3
        </div>
        <h2 className="text-lg">Shipping Details</h2>
      </div>

      {active && (
        <form method="POST" onSubmit={onSubmit}>
          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2 xl:mr-2">
              <label
                htmlFor="shippingMethodHandle"
                className="block text-sm mb-2"
              >
                Shipping Method *
              </label>
              <select
                id="shippingMethodHandle"
                className="w-full text-sm bg-gray-100 rounded px-3 py-3 outline-0"
                name="shippingMethodHandle"
                required="required"
                defaultValue={shippingMethodHandle ?? `Please Select`}
                onChange={onChange}
              >
                <option disabled value="Please Select">
                  Please Select
                </option>
                {shippingOptions &&
                  shippingOptions.map(shippingOption => (
                    <option
                      key={shippingOption.id}
                      value={shippingOption.handle}
                    >
                      {shippingOption.name} - {shippingOption.priceAsCurrency}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex">
            <div className="w-full xl:w-1/2 flex items-end justify-end">
              <button
                type="submit"
                disabled={shippingMethodHandle == null}
                className={`${
                  shippingMethodHandle
                    ? `bg-secondary`
                    : `bg-gray-400 cursor-default`
                } text-primary w-full lg:w-1/3 rounded px-3 py-3 lg:ml-4 mt-6 text-sm outline-0`}
              >
                Next
              </button>
              {loading && <Puff className="ml-4" stroke="#000" />}
            </div>
          </div>
        </form>
      )}

      {selectedShippingOption && !active && (
        <>
          <div>
            {selectedShippingOption.name} -{" "}
            {selectedShippingOption.priceAsCurrency}
          </div>
          <button
            onClick={setActive}
            className="bg-secondary text-primary rounded px-6 py-3 text-sm outline-0 mt-4"
          >
            Edit
          </button>
        </>
      )}
    </div>
  )
}

export default ShippingFormStep
