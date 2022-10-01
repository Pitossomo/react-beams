import { Fragment } from "react"
import NumberInput from "./NumberInput"

const DistributedLoadsFieldset = ({beamParams, updateLoads}) => {
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
              update={newValue => updateLoads(loadIndex, 'startValue', newValue)}
            />

            <label>Carga Final</label>
            <NumberInput
              name='endValue'
              value={load.endValue}
              update={newValue => updateLoads(loadIndex, 'endValue', newValue)}
            />

            <label>X Inicial</label>
            <NumberInput
              name='x0'
              value={load.x0}
              update={newValue => updateLoads(loadIndex, 'x0', newValue)}
              step={0.01}
              attributes={{min: 0, max: load.xf}}
            />

            <label>X Final</label>
            <NumberInput
              name='xf'
              value={load.xf}
              update={newValue => updateLoads(loadIndex, 'xf', newValue)}
              step={0.01}
              attributes={{min: load.x0, max: beamParams.length}}
            />

          </fieldset>
        </Fragment>
      ))}
    </fieldset>
  )
}

export default DistributedLoadsFieldset