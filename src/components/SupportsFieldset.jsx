const SupportsFieldset = ({beamParams, updateSupports}) => {
  function handleSupportChange(value, index) {
    const newSupports = [...beamParams.supports]
    newSupports[index] = Number(value)
    updateSupports(newSupports)
  }

  return (
    <fieldset name="supports" className="supports">
      <legend>Apoios - Coordenadas X</legend>
      { beamParams.supports.map((supportX, index) => (
        <input 
          key={`support${index}`}
          type="number"
          name="support[]"
          className="node-x"
          step="0.01"
          value={supportX}
          onChange={e => handleSupportChange(e.target.value, index)}
        />
      )) }
    </fieldset>
  )
}

export default SupportsFieldset