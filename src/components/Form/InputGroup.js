import React from "react"

const InputGroup = ({
  id,
  label,
  name,
  value,
  type = "text",
  onChange,
  ...props
}) => {
  return (
    <div className="text-left mb-5">
      <label className="uppercase text-grey" htmlFor={id}>
        {label}
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="text-black border border-coolGray-300 px-2 py-3 w-full h-12"
          type={type}
          {...props}
        />
      </label>
    </div>
  )
}

export default InputGroup
