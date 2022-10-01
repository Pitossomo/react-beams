const Controls = ({viewMode, pointerCoordinates, updateViewMode}) => (
  <aside>
    <div>
      <label>View Mode</label>
      <select name="view-mode" value={viewMode} className="view-mode-selector" onChange={e => updateViewMode(e.target.value)}>
        <option value="LOADS">Loads</option>
        <option value="REACTIONS">Reactions</option>
        <option value="SHEAR">Shear Force</option>
        <option value="MOMENTS">Bending Moment</option>
      </select>  
    </div>
    <div>
      <p>
        <strong id="x-label">X: </strong>
        <span id="x-value">
          {pointerCoordinates ? pointerCoordinates.x.toFixed(2).toLocaleString() : "-"}
        </span>
      </p>

      <p>
        <strong id="y-label">Value in x: </strong>
        <span id="y-value">
          {pointerCoordinates ? pointerCoordinates.y.toFixed(2).toLocaleString() : "-"}
        </span>  
      </p>
    </div>
  </aside>
)

export default Controls