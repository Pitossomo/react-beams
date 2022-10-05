import { useEffect, useState } from "react"
import { assertBetween, format } from "../../utils/helpers"

const NumberInput = ({name, value, update, step, attributes = {}}) => {
  const [textValue, setTextValue] = useState(format(value))
  const [isTyping, setTyping] = useState(false)

  useEffect(() => {
    setTextValue(format(value)) 
  }, [value])

  const handleChange = (e) => {
    console.log('Change')
    if (!isTyping) {
      let newValue = assertBetween(
        attributes.min || -Infinity,
        attributes.max || Infinity,
        Number(e.target.value)
      )
      setTextValue(format(e.target.value))
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
    setTextValue(format(newValue))
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