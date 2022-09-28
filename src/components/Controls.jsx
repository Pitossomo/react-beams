const Controls = ({updateViewMode}) => (
  <aside>
    <div>
      <label>View Mode</label>
      <select name="view-mode" class="view-mode-selector" onChange={updateViewMode}>
        <option value="LOADS">Loads</option>
        <option value="REACTIONS">Reactions</option>
        <option value="SHEAR">Shear Force</option>
        <option value="MOMENTS">Bending Moment</option>
      </select>  
    </div>
    <div>
      <p>
        <strong id="x-label">X: </strong>
        <span id="x-value">-</span>
      </p>
      <p>
        <strong id="y-label">Value in x: </strong>
        <span id="y-value">-</span>  
      </p>
    </div>
  </aside>
)

export default Controls