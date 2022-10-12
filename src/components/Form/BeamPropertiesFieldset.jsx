import { Fragment } from "react"
import NumberInput from "./NumberInput"

const BeamPropertiesFieldset = ({beamParams, updateProperty}) => {
  const beamProperties = [
    { name: 'length', label: 'Comprimento', attributes: {min: 0} },
    { name: 'young', label: 'Módulo de Young - E (GPa)', attributes: { min: 1 } },
    { name: 'width', label: 'Largura da viga - b', step: 0.01, attributes: {min: 0.01} },
    { name: 'height', label: 'Altura da viga - h', step: 0.01, attributes: {min: 0.01} }
  ]
  
  return (
    <fieldset className="beamProperties">
      { beamProperties.map(property => (
        <Fragment key={property.name}>
          <label>{property.label}</label>
          <NumberInput
            name={property.name}
            step={property?.step || 1}
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