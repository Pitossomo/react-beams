import BeamPropertiesFieldset from "./Form/BeamPropertiesFieldset"
import DistributedLoadsFieldset from "./Form/DistributedLoadsFieldset"
import PunctualLoadsFieldset from "./Form/PunctualLoadsFieldset"
import SupportsFieldset from "./Form/SupportsFieldset"

const BeamForm = ({beamParams, updateProperty, updatePunctualLoads, updateDistributedLoads, updateSupports} ) => {
  return (
    <form className="beam-form">
      <BeamPropertiesFieldset beamParams={beamParams} updateProperty={updateProperty} />

      <SupportsFieldset beamParams={beamParams} updateSupports={updateSupports}/>

      {/*<PunctualLoadsFieldset beamParams={beamParams} updateLoads={updatePunctualLoads} />*/}

      <DistributedLoadsFieldset beamParams={beamParams} updateLoads={updateDistributedLoads} />
    </form>
  )
}

export default BeamForm