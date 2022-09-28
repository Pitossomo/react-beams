const BeamForm = ({updateLength, updateLoads, updateSupports} ) => (
  <form class="beam-form">
    <fieldset class="beam">
      <label>Comprimento </label>
      <input type="number" name="length" value="10" class="num-field" onChange={updateLength} />
      <legend>Características da viga</legend>
      <label>Módulo de Young - E</label>
      <input type="number" name="young" class="num-field" value="1" />
      <label>Módulo de Inércia - I</label>
      <input type="number" name="inertia" class="num-field" value="1"/>
    </fieldset>

    <fieldset name="supports" class="supports" onChange={updateSupports} >
      <legend>Apoios - Coordenadas X</legend>
      <input type="number" name="support[]" class="node-x" value="0" step="0.01" />
      <input type="number" name="support[]" class="node-x" value="3.3" step="0.01" />
      <input type="number" name="support[]" class="node-x" value="6.7" step="0.01" />
      <input type="number" name="support[]" class="node-x" value="10" step="0.01" />
      <input type="number" name="support[]" class="node-x" step="0.01" />
    </fieldset>

    <fieldset name="distributedloads" onChange={updateLoads} >
      <legend>Cargas Distribuídas</legend>    
      <fieldset name="distributedload" class="distributedloads">
        <label>Carga inicial</label>
        <input type="number" name="startValue" class="num-field" value="5" />
        <label>Carga final</label>
        <input type="number" name="endValue" class="num-field" value="5" />
        <label>Coord. X inicial</label>
        <input type="number" name="x0" class="num-field" value="0" />
        <label>Coord. X final</label>
        <input type="number" name="xf" class="num-field" value="10" />
      </fieldset>  
    </fieldset>
  </form>
)

export default BeamForm