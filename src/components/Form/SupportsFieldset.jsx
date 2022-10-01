import NumberInput from "./NumberInput"

const SupportsFieldset = ({beamParams, updateSupports}) => {
  const STEP = 0.01

  function handleSupportChange(value, index) {
    const newSupports = [...beamParams.supports]
    newSupports[index] = Number(value)
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

        return (
          <NumberInput key={`support${index}`}
            name="support[]"
            step={STEP}
            value={supportX}
            update={e => handleSupportChange(e.target.value, index)}
            attributes={attributes}
          />
        )
      })}
    </fieldset>
  )
}

export default SupportsFieldset