import { Fragment } from "react"
import NumberInput from "./NumberInput"

const BeamPropertiesFieldset = ({beamParams, updateProperty}) => {
  const STEP = 1
  const beamProperties = [
    { name: 'length', label: 'Comprimento', attributes: {min: 0} },
    { name: 'young', label: 'Módulo de Young - E', attributes: {min: 0 } },
    { name: 'inertia', label: 'Módulo de Inércia - I', attributes: {min: 0} }
  ]
  
  return (
    <fieldset className="beamProperties">
      { beamProperties.map(property => (
        <Fragment key={property.name}>
          <label>{property.label}</label>
          <NumberInput
            name={property.name}
            step={STEP}
            value={beamParams[property.name]}
            update={newValue => updateProperty(property.name, newValue)}
            attributes={property.attributes}
          />
        </Fragment>
      ))}
    </fieldset>
  )
}

export default BeamPropertiesFieldset