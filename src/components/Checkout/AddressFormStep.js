import React from "react"
import { Puff } from "svg-loaders-react"

import { isAddressValid } from "@utilities"

const AddressFormStep = ({
  address,
  cart,
  countries,
  onChange,
  onSubmit,
  setActive,
  loading = false,
  active = false,
}) => {
  // Render addresses from the cart
  const { shippingAddress } = cart

  return (
    <div className="py-6 lg:p-10 lg:pt-8 border-b border-solid border-grey-light">
      <div className="flex items-center mb-4">
        <div className="border-2 border-solid border-red-commerce py-2 px-3 rounded-full font-bold mr-2 text-red-commerce">
          2
        </div>
        <h2 className="text-lg">Your Address</h2>
      </div>

      {active && (
        <form method="POST" onSubmit={onSubmit}>
          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2 mb-4 xl:mr-2">
              <label
                htmlFor="firstName"
                className="block text-sm mb-2 {% if address and address.getFirstError('firstName') %}text-red{% endif %}"
              >
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={address.firstName}
                className="w-full text-sm bg-gray-100 rounded px-3 py-3 outline-0"
                onChange={onChange}
                required
              />
            </div>
            <div className="w-full xl:w-1/2 mb-4">
              <label
                htmlFor="addressLastName"
                className="block text-sm mb-2 {% if address and address.getFirstError('lastName') %}text-red{% endif %}"
              >
                Last Name *
              </label>
              <input
                id="addressLastName"
                name="lastName"
                className="w-full text-sm bg-gray-100 rounded px-3 py-3 outline-0"
                type="text"
                required
                value={address ? address.lastName : ``}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2 mb-4 xl:mr-2">
              <label
                htmlFor="address1"
                className="block text-sm mb-2 {% if address and address.getFirstError('address1') %}text-red{% endif %}"
              >
                Address Line 1 *
              </label>
              <input
                id="address1"
                className="w-full text-sm bg-gray-100 rounded px-3 py-3 outline-0"
                name="address1"
                type="text"
                required
                value={address ? address.address1 : ``}
                onChange={onChange}
              />
            </div>
            <div className="w-full xl:w-1/2 mb-4">
              <label
                htmlFor="address2"
                className="block text-sm mb-2 {% if address and address.getFirstError('address2') %}text-red{% endif %}"
              >
                Address Line 2
              </label>
              <input
                id="address2"
                className="w-full text-sm bg-gray-100 rounded px-3 py-3 outline-0"
                name="address2"
                type="text"
                value={address ? address.address2 : ``}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2 mb-4 xl:mr-2">
              <label
                htmlFor="city"
                className="block text-sm mb-2 {% if address and address.getFirstError('city') %}text-red{% endif %}"
              >
                City *
              </label>
              <input
                id="city"
                className="w-full text-sm bg-gray-100 rounded px-3 py-3 outline-0"
                name="city"
                type="text"
                required
                value={address ? address.city : ``}
                onChange={onChange}
              />
            </div>
            <div className="w-full xl:w-1/2 mb-4">
              <label
                htmlFor="zipCode"
                className="block text-sm mb-2 {% if address and address.getFirstError('zipCode') %}text-red{% endif %}"
              >
                Zip *
              </label>
              <input
                id="zipCode"
                className="w-full text-sm bg-gray-100 rounded px-3 py-3 outline-0"
                name="zipCode"
                type="text"
                required
                value={address ? address.zipCode : ``}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2 mb-4 xl:mr-2">
              <label
                htmlFor="stateValue"
                className="block text-sm mb-2 {% if address and address.getFirstError('stateValue') %}text-red{% endif %}"
              >
                State
              </label>
              <input
                id="stateValue"
                className="w-full text-sm bg-gray-100 rounded px-3 py-3 outline-0"
                name="stateValue"
                type="text"
                value={address ? address.stateValue : ``}
                onChange={onChange}
              />
            </div>
            <div className="w-full xl:w-1/2 xl:mr-2">
              <label htmlFor="country" className="block text-sm mb-2">
                Country *
              </label>
              <select
                id="country"
                className="w-full text-sm bg-gray-100 rounded px-3 py-3 outline-0"
                name="countryId"
                required
                defaultValue={address ? address.countryId : `Please Select`}
                onChange={onChange}
              >
                <option disabled value="Please Select">
                  Please Select
                </option>
                {countries &&
                  countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex">
            <div className="w-full xl:w-1/2 flex items-end justify-end">
              <button
                type="submit"
                className="bg-secondary text-primary w-full lg:w-1/3 rounded px-3 py-3 lg:ml-4 mt-6 text-sm outline-0"
              >
                Next
              </button>
              {loading && <Puff className="ml-4" stroke="#000" />}
            </div>
          </div>
        </form>
      )}

      {isAddressValid(shippingAddress) && !active && (
        <>
          {shippingAddress.firstName || ""} {shippingAddress.lastName || ""}
          {(shippingAddress.firstName || shippingAddress.lastName) && <br />}
          {shippingAddress.address1 && (
            <>
              {shippingAddress.address1} <br />
            </>
          )}
          {shippingAddress.address2 && (
            <>
              {shippingAddress.address2} <br />
            </>
          )}
          {shippingAddress.city ? `${shippingAddress.city}, ` : ""}
          {shippingAddress.zipCode || ""}
          {(shippingAddress.city || shippingAddress.zipCode) && <br />}
          {shippingAddress.stateValue || ""} {shippingAddress.countryText || ""}
          {(shippingAddress.stateValue || shippingAddress.countryText) && (
            <br />
          )}
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

export default AddressFormStep
