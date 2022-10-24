import BeamPropertiesFieldset from "./BeamPropertiesFieldset"
import DistributedLoadsFieldset from "./DistributedLoadsFieldset"
import PunctualLoadsFieldset from "./PunctualLoadsFieldset"
import SupportsFieldset from "./SupportsFieldset"
import './style.css'

const Form = ({beamParams, updateProperty, updatePunctualLoads, updateDistributedLoads, updateSupports} ) => {
  return (
    <form className="beam-form">
      <BeamPropertiesFieldset beamParams={beamParams} updateProperty={updateProperty} />

      <SupportsFieldset beamParams={beamParams} updateSupports={updateSupports}/>

      <DistributedLoadsFieldset beamParams={beamParams} updateLoads={updateDistributedLoads} />

      <PunctualLoadsFieldset beamParams={beamParams} updateLoads={updatePunctualLoads} />
    </form>
  )
}

export default Form