import { Fragment } from "react"
import NumberInput from "./NumberInput"

const BeamPropertiesFieldset = ({beamParams, updateProperty}) => {
  const beamProperties = [
    { name: 'length', label: 'Comprimento', unit: 'm', attributes: {min: 0} },
    { name: 'young', label: 'Módulo de Young (E)', unit: 'm', attributes: { min: 1 } },
    { name: 'width', label: 'Largura da viga (b)', unit: 'GPa', step: 0.01, attributes: {min: 0.01} },
    { name: 'height', label: 'Altura da viga (h)', unit: 'm',  step: 0.01, attributes: {min: 0.01} },
  ]
  
  return (
    <fieldset className="beam-properties">
      { beamProperties.map(property => (
        <div className='property' key={property.name}>
          <label>{property.label}</label>
          <NumberInput
            name={property.name}
            step={property?.step || 1}
            value={beamParams[property.name]}
            unit={property?.unit}
            update={newValue => updateProperty(property.name, newValue)}
            attributes={property.attributes}
          />
        </div>
      ))}
    </fieldset>
  )
}

export default BeamPropertiesFieldset