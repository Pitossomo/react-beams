import { useState } from "react"
import { assertBetween } from "../../utils/helpers"

const NumberInput = ({name, value, update, step, attributes = {}}) => {
  const [textValue, setTextValue] = useState(value.toFixed(2).toLocaleString())
  const [isTyping, setTyping] = useState(false)

  const handleChange = (e) => {
    console.log('Change')
    setTextValue(e.target.value)
    if (!isTyping) {
      let newValue = assertBetween(
        attributes.min || -Infinity,
        attributes.max || Infinity,
        Number(e.target.value)
      )
      update(newValue)
    } else {
      setTextValue(e.target.value)
    }
  }

  const handleKeyDown = () => {
    console.log('Key down')
    if (!isTyping) setTyping(true)
  }

  const handleBlur = (e) => {
    console.log('Blur')
    setTyping(false)
    let newValue = assertBetween(
      attributes.min || -Infinity,
      attributes.max || Infinity,
      Number(e.target.value)
    )
    setTextValue(newValue.toFixed(2).toLocaleString())
    update(newValue)
  }

  return <input
    type="number"
    className="num-field"
    name={name}
    value={textValue}
    onKeyDown={handleKeyDown}
    onChange={handleChange}
    onBlur={handleBlur}
    step={step}
    {...attributes}
  />
}

export default NumberInput