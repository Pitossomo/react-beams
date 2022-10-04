const Controls = ({viewMode, pointerCoordinates, updateViewMode}) => {
  const LABELS = {
    'SHEAR': 'Esforço cortante',
    'MOMENTS': 'Momento fletor'
  } 
  
  return (
    <aside>
      <div>
        <label>Modo de visão</label>
        <select name="view-mode" value={viewMode} className="view-mode-selector" onChange={e => updateViewMode(e.target.value)}>
          <option value="LOADS">Cargas na Viga</option>
          <option value="REACTIONS">Reações nos Apoios</option>
          <option value="SHEAR">Diagrama de Esforço Contante</option>
          <option value="MOMENTS">Diagrama de Momento Fletor</option>
        </select>
      </div>
      <div className="coordinates-wrapper">
        <div>
          <strong id="x-label">x =</strong>
          <span id="x-value">
            { pointerCoordinates ? pointerCoordinates.x.toFixed(2).toLocaleString() : "-"}
          </span>
        </div>
        <div>
          <strong id="y-label">{LABELS[viewMode] || 'Valor'}=</strong>
          <span id="y-value">
            { pointerCoordinates ? pointerCoordinates.y.toFixed(2).toLocaleString() : "-"}
          </span>
        </div>
      </div>
    </aside>
  )
}

export default Controls