import NumberInput from "./NumberInput"

const PunctualLoadsFieldset = ({beamParams, updateLoads}) => {
  function updateLoad (loadIndex, propertyName, newValue) {
    const newPunctualLoads = [...beamParams.punctualLoads]
    newPunctualLoads[loadIndex] = {...(newPunctualLoads[loadIndex])}
    newPunctualLoads[loadIndex][propertyName] = Number(newValue)
    updateLoads(newPunctualLoads)
  }

  const handleAddLoad = (event) => {
    event.preventDefault()
    const newLoads = [...beamParams.punctualLoads]
    
    const lastLoad = beamParams.punctualLoads[beamParams.punctualLoads.length - 1]
    const lastXf = lastLoad?.xf || 0 
    
    newLoads.push({
      value: beamParams.punctualLoads.length + 1,
      x: lastXf < beamParams.length ? lastXf : 0,
    })
    updateLoads(newLoads)
  }
  
  const handleRemoveLoad = (index, event) => {
    event.preventDefault()
    const newLoads = [...beamParams.punctualLoads]
    newLoads.splice(index, 1)

    updateLoads(newLoads)
  }

  return (
    <fieldset name="punctualloads">
      <legend>Cargas Pontuais</legend>
      { beamParams.punctualLoads.map((load, loadIndex) => (
        <div key={`pload${loadIndex}`} className='load-fieldset hover-wrapper'>
          <fieldset name="punctualload" className="punctualloads">
            <label>Carga</label>
            <NumberInput
              name='value'
              value={load.value}
              update={newValue => updateLoad(loadIndex, 'value', newValue)}
            />

            <label>X:</label>
            <NumberInput
              name='x'
              value={load.x}
              update={newValue => updateLoad(loadIndex, 'x', newValue)}
            />
          </fieldset>
          <button 
            onClick={e => handleRemoveLoad(loadIndex, e)} 
            className='show-on-hover red'
          >
            ✖
          </button>
        </div>
      ))}
      <button onClick={handleAddLoad} className='addButton small'> + </button>
    </fieldset>
  )
}

export default PunctualLoadsFieldset