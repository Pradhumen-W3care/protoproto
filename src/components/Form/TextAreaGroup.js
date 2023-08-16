import React from "react"

const TextAreaGroup = ({ id, label, name, value, onChange, ...props }) => {
  return (
    <div className="text-left mb-5">
      <label className="uppercase text-grey" htmlFor={id}>
        {label}
        <textarea
          id={id}
          className="text-black border border-coolGray-300 px-2 py-3 w-full"
          name={name}
          cols="30"
          rows="6"
          value={value}
          onChange={onChange}
          {...props}
        />
      </label>
    </div>
  )
}

export default TextAreaGroup
