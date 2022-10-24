import { useEffect, useState } from "react"
import { assertBetween, format } from "../../../utils/helpers"
import './style.css'

const NumberInput = ({label, name, value, update, unit, step, attributes = {}}) => {
  const [textValue, setTextValue] = useState(format(value))
  const [isTyping, setTyping] = useState(false)

  useEffect(() => {
    setTextValue(format(value)) 
  }, [value])

  const handleChange = (e) => {
    if (!isTyping) {
      let newValue = assertBetween(
        attributes.min || -Infinity,
        attributes.max || Infinity,
        Number(e.target.value)
      )
      setTextValue(format(Number(e.target.value)))
      update(newValue)
    } else {
      setTextValue(e.target.value)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (isTyping) setTyping(false)
    }
    
    if (!isTyping) setTyping(true)
  }

  const handleBlur = (e) => {
    setTyping(false)
    let newValue = assertBetween(
      attributes.min || -Infinity,
      attributes.max || Infinity,
      Number(e.target.value)
    )
    setTextValue(format(newValue))
    update(newValue)
  }

  return (
    <>
      { label ? <label>{label}</label> : null}
      <div className="input-wrapper">
        <input
          type="number"
          name={name}
          value={textValue}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={handleBlur}
          step={step}
          {...attributes}
        />
        { unit ? <span>{unit}</span> : null }
      </div>
    </>
  )
}

export default NumberInput