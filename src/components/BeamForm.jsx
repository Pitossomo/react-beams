import BeamPropertiesFieldset from "./Form/BeamPropertiesFieldset"
import DistributedLoadsFieldset from "./Form/DistributedLoadsFieldset"
import SupportsFieldset from "./Form/SupportsFieldset"

const BeamForm = ({beamParams, updateProperty, updateLoads, updateSupports} ) => {
  return (
    <form className="beam-form">
      <BeamPropertiesFieldset beamParams={beamParams} updateProperty={updateProperty} />

      <SupportsFieldset beamParams={beamParams} updateSupports={updateSupports}/>

      <DistributedLoadsFieldset beamParams={beamParams} updateLoads={updateLoads} />
    </form>
  )
}

export default BeamForm