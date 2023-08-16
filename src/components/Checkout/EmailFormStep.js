import React from "react"
import PropTypes from "prop-types"
import { Puff } from "svg-loaders-react"

const EmailFormStep = ({
  email,
  isCurrentUser = false,
  onChange,
  onSubmit,
  setActive,
  active = false,
  loading = false,
}) => {
  return (
    <div className="py-6 lg:p-10 border-b border-solid border-grey-light">
      <div className="flex items-center mb-4">
        <div className="border-2 border-solid border-red-commerce py-2 px-3 rounded-full font-bold mr-2 text-red-commerce">
          1
        </div>
        <h2 className="text-lg">Your Email</h2>
      </div>

      {active && (
        <form method="POST" onSubmit={onSubmit}>
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="w-full 2xl:w-2/3 mb-4 lg:mb-0">
              <label htmlFor="email" className="block text-sm mb-2">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                required
                className="w-full text-sm bg-gray-100 rounded px-3 py-3 outline-0"
              />
            </div>
            <div className="w-full flex items-end justify-end lg:justify-start">
              <button
                type="submit"
                className="bg-secondary text-primary rounded px-3 py-3 text-sm outline-0 w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 lg:ml-4"
              >
                Next
              </button>
              {loading && <Puff className="ml-4" stroke="#000" />}
            </div>
          </div>
        </form>
      )}

      {!active && email && (
        <>
          <p>{email}</p>
          {!isCurrentUser && (
            <button
              onClick={setActive}
              className="bg-secondary text-primary rounded px-6 py-3 text-sm outline-0 mt-4"
            >
              Edit
            </button>
          )}
        </>
      )}
    </div>
  )
}

EmailFormStep.defaultProps = {
  email: "",
}

EmailFormStep.propTypes = {
  active: PropTypes.bool,
  email: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
}

export default EmailFormStep
