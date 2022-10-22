import NumberInput from "./NumberInput"

const SupportsFieldset = ({beamParams, updateSupports}) => {
  const STEP = 0.01
  const ADD_STEP = -0.50

  function handleSupportChange(value, index) {
    const newSupports = [...beamParams.supports]
    newSupports[index] = Number(value)
    updateSupports(newSupports)
  }

  function handleRemove(index, event) {
    event.preventDefault()
    if (beamParams.supports.length > 2) {
      const newSupports = [...beamParams.supports]
      newSupports.splice(index, 1)
      updateSupports(newSupports)  
    }
  }

  function handleAddSupport(event) {
    event.preventDefault()
    let newValue = beamParams.length
    while (beamParams.supports.includes(newValue)) {
      newValue += ADD_STEP
    }
    if (newValue < 0) return
    updateSupports([
      ...beamParams.supports,
      newValue
    ])
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
          <div className='input-wrapper hover-wrapper' key={`support${index}`}>
            <label>Apoio {index+1}</label>
            <NumberInput
              name="support[]"
              step={STEP}
              value={supportX}
              update={newValue => handleSupportChange(newValue, index)}
              attributes={attributes}
              unit={"m"}
            />
            <button 
              onClick={e => handleRemove(index, e)} 
              className={`show-on-hover ${beamParams.supports.length > 2 ? 'red' : 'gray'}`}
            >
              ✖
            </button>
          </div>
        )
      })}
      <button onClick={handleAddSupport} className='addButton small'> + </button> 
    </fieldset>
  )
}

export default SupportsFieldset