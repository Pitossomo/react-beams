import NumberInput from "../NumberInput"

const ProjectPropertiesFieldset = ({beamParams, updateProperty}) => {
  const projectProperties = [
    { name: 'fck', label: 'Resistência (fck)', unit: 'MPa', attributes: {min: 1} },
    { name: 'cover', label: 'Cobrimento (c)', unit: 'm', step: 0.005, attributes: { min: 0.01 } },
    { name: 'loadIncrease', label: 'Coeficiente de majoração das cargas', step: 0.01, attributes: { min: 1 }}
  ]
  
  return (
    <fieldset className="card beam-properties">
      <strong>Fatores do dimensionamento</strong>
      <div className='fields'>
        { projectProperties.map(property => (
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

export default ProjectPropertiesFieldset