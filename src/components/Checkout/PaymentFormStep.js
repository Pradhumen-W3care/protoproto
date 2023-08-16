import React from "react"
import StripeForm from "@components/StripeForm"


const PaymentFormStep = ({ cart, onSubmit, active = false, loading }) => {

  return (
    <div className="add-to-cart-form">
      <div className="py-6 lg:p-10 lg:pt-8">
        <div className="flex items-center mb-4">
          <div className="border-2 border-solid border-red-commerce py-2 px-3 rounded-full font-bold mr-2 text-red-commerce">
            4
          </div>
          <h2 className="text-lg">Your Payment Information</h2>
        </div>
        {active && (
          <StripeForm cart={cart} loading={loading} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  )
}

export default PaymentFormStep
