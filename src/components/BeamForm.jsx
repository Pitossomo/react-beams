import BeamProperties from "./BeamProperties"
import SupportsFieldset from "./SupportsFieldset"

const BeamForm = ({beamParams, updateProperty, updateLoads, updateSupports} ) => {
  return (
    <form className="beam-form">
      <BeamProperties updateProperty={updateProperty} beamParams={beamParams} />

      <SupportsFieldset
        beamParams={beamParams}
        updateSupports={updateSupports}
      />

      <fieldset name="distributedloads" onChange={updateLoads} >
        <legend>Cargas Distribuídas</legend>    
        <fieldset name="distributedload" className="distributedloads">
          <label>Carga inicial</label>
          <input type="number" name="startValue" className="num-field" value="5" />
          <label>Carga final</label>
          <input type="number" name="endValue" className="num-field" value="5" />
          <label>Coord. X inicial</label>
          <input type="number" name="x0" className="num-field" value="0" />
          <label>Coord. X final</label>
          <input type="number" name="xf" className="num-field" value="10" />
        </fieldset>  
      </fieldset>
    </form>
  )
}

export default BeamForm