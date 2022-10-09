import NumberInput from "./NumberInput"

const DistributedLoadsFieldset = ({beamParams, updateLoads}) => {
  function updateLoad (loadIndex, propertyName, newValue) {
    const newDistributedLoads = [...beamParams.distributedLoads]
    newDistributedLoads[loadIndex] = {...(newDistributedLoads[loadIndex])}
    newDistributedLoads[loadIndex][propertyName] = Number(newValue)
    updateLoads(newDistributedLoads)
  }

  const handleAddLoad = (event) => {
    event.preventDefault()
    const newLoads = [...beamParams.distributedLoads]
    
    const lastLoad = beamParams.distributedLoads[beamParams.distributedLoads.length - 1]
    const lastXf = lastLoad?.xf || 0 
    
    newLoads.push({
      startValue: 5,
      endValue: 10,
      x0: lastXf < beamParams.length ? lastXf : 0,
      xf: beamParams.length
    })
    updateLoads(newLoads)
  }

  const handleRemoveLoad = (index, event) => {
    event.preventDefault()
    const newLoads = [...beamParams.distributedLoads]
    newLoads.splice(index, 1)

    updateLoads(newLoads)
  }

  return (
    <fieldset name="distributedloads">
      <legend>Cargas Distribuídas</legend>
      { beamParams.distributedLoads.map((load, loadIndex) => (
        <div key={`load${loadIndex}`} className='load-fieldset hover-wrapper'>
          <fieldset name="distributedload" className="distributedloads">
            <label>Carga Inicial</label>
            <NumberInput
              name='startValue'
              value={load.startValue}
              update={newValue => updateLoad(loadIndex, 'startValue', newValue)}
            />

            <label>Carga Final</label>
            <NumberInput
              name='endValue'
              value={load.endValue}
              update={newValue => updateLoad(loadIndex, 'endValue', newValue)}
            />

            <label>X Inicial</label>
            <NumberInput
              name='x0'
              value={load.x0}
              update={newValue => updateLoad(loadIndex, 'x0', newValue)}
              step={0.01}
              attributes={{min: 0, max: load.xf}}
            />

            <label>X Final</label>
            <NumberInput
              name='xf'
              value={load.xf}
              update={newValue => updateLoad(loadIndex, 'xf', newValue)}
              step={0.01}
              attributes={{min: load.x0, max: beamParams.length}}
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
      <button onClick={handleAddLoad} className='addButton big'> + </button>
    </fieldset>
  )
}

export default DistributedLoadsFieldset