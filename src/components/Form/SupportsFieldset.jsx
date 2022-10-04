import NumberInput from "./NumberInput"

const SupportsFieldset = ({beamParams, updateSupports}) => {
  const STEP = 0.01

  function handleSupportChange(value, index) {
    const newSupports = [...beamParams.supports]
    newSupports[index] = Number(value)
    updateSupports(newSupports)
  }

  function removeSupport(index, event) {
    event.preventDefault()
    const newSupports = [...beamParams.supports]
    newSupports.splice(index, 1)
    updateSupports(newSupports)
  }

  return (
    <fieldset name="supports" className="supports">
      <legend>Apoios - Coordenadas X</legend>
      { beamParams.supports.map((supportX, index) => {
        let attributes = {}
        attributes.min = (index > 0) 
          ? beamParams.supports[index-1] + STEP
          : 0  
        attributes.max = (index < beamParams.supports.length - 1) 
          ? beamParams.supports[index+1] - STEP
          : beamParams.length  

        return <div className='support-wrapper' key={`support${index}`}>
          <NumberInput
            name="support[]"
            step={STEP}
            value={supportX}
            update={newValue => handleSupportChange(newValue, index)}
            attributes={attributes}
          />
          <button onClick={e => removeSupport(index, e)} className="show-on-hover">✖</button>
        </div>
      })}
    </fieldset>
  )
}

export default SupportsFieldset