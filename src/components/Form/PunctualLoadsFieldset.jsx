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
    <fieldset className="punctual-loads-fieldset">
      <legend>Carregamentos Pontuais</legend>
      { beamParams.punctualLoads.map((load, loadIndex) => (
        <div key={`pload${loadIndex}`} className='punctual-load hover-wrapper'>
          <fieldset name="punctualload" className="punctual-load-fieldset">
            <div>
              <label>Carga:</label>
              <NumberInput
                name='value'
                value={load.value}
                update={newValue => updateLoad(loadIndex, 'value', newValue)}
              />
            </div>
            <div>
              <label>X:</label>
              <NumberInput
                name='x'
                value={load.x}
                update={newValue => updateLoad(loadIndex, 'x', newValue)}
                step='0.01'
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