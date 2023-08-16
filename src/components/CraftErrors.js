import React, { useEffect, useState } from "react"

const CraftErrors = ({ errors: initErrors, duration = 3000 }) => {
  const [errors, setErrors] = useState(initErrors)
  const [errorList, setErrorList] = useState([])

  useEffect(() => {
    setErrors(initErrors)
  }, [initErrors])

  useEffect(() => {
    const errorsArr = []
    for (const [key, value] of Object.entries(errors)) {
      value.map(val => errorsArr.push(val))
    }
    setErrorList(errorsArr)
  }, [errors])

  useEffect(() => {
    if (errorList.length > 0) {
      setTimeout(() => {
        setErrorList([])
      }, duration)
    }
    // eslint-disable-next-line
  }, [errorList])

  return (
    <>
      {errorList.map((error, i) => (
        <div
          key={i}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      ))}
    </>
  )
}

export default CraftErrors
