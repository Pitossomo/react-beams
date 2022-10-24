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
    newLoads.push({
      value: Math.round(Math.min(Math.round(Math.random()*10,1)*100))/100,
      x: Math.round(Math.random()*beamParams.length*100)/100,
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
    <fieldset className="card loads-fieldset">
      <strong>Carregamentos Pontuais</strong>
      { beamParams.punctualLoads.map((load, loadIndex) => (
        <div key={`pload${loadIndex}`} className='punctual-load hover-wrapper'>
          <fieldset className='load-fieldset'>
            <div className='labeled-field'>
              <NumberInput
                label='Carga'
                name='value'
                value={load.value}
                update={newValue => updateLoad(loadIndex, 'value', newValue)}
                unit={'kN'}
              />
            </div>
            <div className='labeled-field'> 
              <NumberInput
                label='X'
                name='x'
                value={load.x}
                update={newValue => updateLoad(loadIndex, 'x', newValue)}
                step='0.01'
                unit={'m'}
              />
            </div>            
          </fieldset>
          <button 
            onClick={e => handleRemoveLoad(loadIndex, e)} 
            className='show-on-hover red'
          >
            ✖
          </button>
        </div>
      ))}
      <button onClick={handleAddLoad} className='addButton big'> + </button>
    </fieldset>
  )
}

export default PunctualLoadsFieldset