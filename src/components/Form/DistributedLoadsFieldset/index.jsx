import NumberInput from "../NumberInput"

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
      startValue: Math.round(Math.random()*10*100)/100,
      endValue: Math.round(Math.random()*10)/100,
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
    <fieldset className="card loads-fieldset">
      <strong>Carregamentos Distribuídos</strong>
      { beamParams.distributedLoads.map((load, loadIndex) => (
        <div key={`load${loadIndex}`} className='distributed-load hover-wrapper'>
          <fieldset className="load-fieldset">
            <div className='labeled-field'>
              <NumberInput
                label='Carga Inicial'
                name='startValue'
                value={load.startValue}
                update={newValue => updateLoad(loadIndex, 'startValue', newValue)}
                unit={'kN/m'}
              />
            </div>

            <div className='labeled-field'>
              <NumberInput
                label='Carga Final'
                name='endValue'
                value={load.endValue}
                update={newValue => updateLoad(loadIndex, 'endValue', newValue)}
                unit={'kN/m'}
              />
            </div>

            <div className='labeled-field'>
              <NumberInput
                label='X Inicial'
                name='x0'
                value={load.x0}
                update={newValue => updateLoad(loadIndex, 'x0', newValue)}
                step={0.01}
                attributes={{min: 0, max: load.xf}}
                unit={'m'}
              />
            </div>

            <div className='labeled-field'>
              <NumberInput
                label='X Final'
                name='xf'
                value={load.xf}
                update={newValue => updateLoad(loadIndex, 'xf', newValue)}
                step={0.01}
                attributes={{min: load.x0, max: beamParams.length}}
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

export default DistributedLoadsFieldset