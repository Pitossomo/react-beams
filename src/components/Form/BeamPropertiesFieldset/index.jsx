import NumberInput from "../NumberInput"
import './style.css'

const BeamPropertiesFieldset = ({beamParams, updateProperty}) => {
  const beamProperties = [
    { name: 'length', label: 'Comprimento', unit: 'm', attributes: {min: 0} },
    { name: 'young', label: 'Módulo de Young (E)', unit: 'm', attributes: { min: 1 } },
    { name: 'width', label: 'Largura da viga (b)', unit: 'GPa', step: 0.01, attributes: {min: 0.01} },
    { name: 'height', label: 'Altura da viga (h)', unit: 'm',  step: 0.01, attributes: {min: 0.01} },
  ]
  
  return (
    <fieldset className="card beam-properties">
      <strong>Propriedades da viga</strong>
      <div className='fields'>
        { beamProperties.map(property => (
          <div className='labeled-field' key={property.name}>
            <NumberInput
              label={property.label}
              name={property.name}
              step={property?.step || 1}
              value={beamParams[property.name]}
              unit={property?.unit}
              update={newValue => updateProperty(property.name, newValue)}
              attributes={property.attributes}
            />
          </div>
        ))}
      </div>
    </fieldset>
  )
}

export default BeamPropertiesFieldset