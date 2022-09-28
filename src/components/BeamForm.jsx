import { Fragment } from "react"
import BeamProperties from "./BeamProperties"
import SupportsFieldset from "./SupportsFieldset"

const BeamForm = ({beamParams, updateProperty, updateLoads, updateSupports} ) => {
  const loadProperties = [
    { name: 'startValue', label: 'Carga inicial' },
    { name: 'endValue', label: 'Carga final' },
    { name: 'x0', label: 'Coord. X inicial' },
    { name: 'xf', label: 'Coord. X final' },
  ]

  return (
    <form className="beam-form">
      <BeamProperties updateProperty={updateProperty} beamParams={beamParams} />

      <SupportsFieldset
        beamParams={beamParams}
        updateSupports={updateSupports}
      />

      <fieldset name="distributedloads">
        { beamParams.distributedLoads.map((load, loadIndex) => (
          <Fragment key={`load${loadIndex}`}>
            <legend>Cargas Distribuídas</legend>
            <fieldset name="distributedload" className="distributedloads">
              { loadProperties.map(({name, label}) => (
                <Fragment key={name}>
                  <label>{label}</label>
                  <input 
                    type="number"
                    name={name}
                    className="num-field"
                    value={load[name]}
                    onChange={e => updateLoads(loadIndex, name, e.target.value)}
                  />
                </Fragment>
              ))} 
            </fieldset>
          </Fragment>
        ))}
      </fieldset>
    </form>
  )
}

export default BeamForm