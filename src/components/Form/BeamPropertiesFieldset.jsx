import { Fragment } from "react"

const BeamPropertiesFieldset = ({beamParams, updateProperty}) => {
  const beamProperties = [
    { name: 'length', label: 'Comprimento', attributes: {min: 0} },
    { name: 'young', label: 'Módulo de Young - E' },
    { name: 'inertia', label: 'Módulo de Inércia - I' }
  ]

  return (
    <fieldset className="beamProperties">
      { beamProperties.map(property => (
        <Fragment key={property.name}>
          <label>{property.label}</label>
          <input
            type="number"
            name={property.name}
            value={beamParams[property.name]}
            onChange={e => updateProperty(property.name, e.target.value)}
            className="num-field"
          />
        </Fragment>
      ))}
    </fieldset>
  )
}

export default BeamPropertiesFieldset