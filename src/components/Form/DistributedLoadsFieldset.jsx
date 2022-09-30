import { Fragment } from "react"
import NumberInput from "./NumberInput"

const DistributedLoadsFieldset = ({beamParams, updateLoads}) => {
  const loadProperties = [
    { name: 'startValue', label: 'Carga inicial' },
    { name: 'endValue', label: 'Carga final' },
    { name: 'x0', label: 'Coord. X inicial', attributes: {min: 0} },
    { name: 'xf', label: 'Coord. X final', attributes: {max: beamParams.length} },
  ]

  return (
    <fieldset name="distributedloads">
      { beamParams.distributedLoads.map((load, loadIndex) => (
        <Fragment key={`load${loadIndex}`}>
          <legend>Cargas Distribuídas</legend>
          <fieldset name="distributedload" className="distributedloads">
            <label>Carga Inicial</label>
            <NumberInput
              name='startValue'
              value={load.startValue}
              update={e => updateLoads(loadIndex, 'startValue', e.target.value)}
            />

            <label>Carga Final</label>
            <NumberInput
              name='endValue'
              value={load.endValue}
              update={e => updateLoads(loadIndex, 'endValue', e.target.value)}
            />

            <label>X Inicial</label>
            <NumberInput
              name='x0'
              value={load.x0}
              update={e => updateLoads(loadIndex, 'x0', e.target.value)}
              attributes={{min: 0, max: load.xf}}
            />

            <label>X Final</label>
            <NumberInput
              name='xf'
              value={load.xf}
              update={e => updateLoads(loadIndex, 'xf', e.target.value)}
              attributes={{min: load.x0, max: beamParams.length}}
            />

          </fieldset>
        </Fragment>
      ))}
    </fieldset>
  )
}

export default DistributedLoadsFieldset