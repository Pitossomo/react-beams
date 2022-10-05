import { useEffect, useState } from "react"
import { assertBetween } from "../../utils/helpers"

const NumberInput = ({name, value, update, step, attributes = {}}) => {
  const [textValue, setTextValue] = useState(value.toLocaleString())
  const [isTyping, setTyping] = useState(false)

  useEffect(() => {
    setTextValue(value.toLocaleString()) 
  }, [value])

  const handleChange = (e) => {
    console.log('Change')
    if (!isTyping) {
      let newValue = assertBetween(
        attributes.min || -Infinity,
        attributes.max || Infinity,
        e.target.value
      )
      setTextValue(e.target.value.toLocaleString())
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
      e.target.value
    )
    setTextValue(newValue.toLocaleString())
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