const NumberInput = ({name, value, update, step, attributes}) => {
  return <input
    type="number"
    className="num-field"
    name={name}
    value={value}
    onChange={update}
    step={step}
    {...attributes}
  />
}

export default NumberInput