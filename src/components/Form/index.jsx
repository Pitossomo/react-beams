import BeamPropertiesFieldset from "./BeamPropertiesFieldset"
import DistributedLoadsFieldset from "./DistributedLoadsFieldset"
import PunctualLoadsFieldset from "./PunctualLoadsFieldset"
import SupportsFieldset from "./SupportsFieldset"
import ProjectPropertiesFieldset from "./ProjectPropertiesFieldset"
import './style.css'

const Form = ({beamParams, viewMode, updateProperty, updatePunctualLoads, updateDistributedLoads, updateSupports} ) => {
  return (
    <form className="beam-form">
      <BeamPropertiesFieldset beamParams={beamParams} updateProperty={updateProperty} />

      { viewMode !== 'STEEL_AREA' 
        ? null
        : <ProjectPropertiesFieldset  beamParams={beamParams} updateProperty={updateProperty}/>
      }

      <SupportsFieldset beamParams={beamParams} updateSupports={updateSupports}/>

      <DistributedLoadsFieldset beamParams={beamParams} updateLoads={updateDistributedLoads} />

      <PunctualLoadsFieldset beamParams={beamParams} updateLoads={updatePunctualLoads} />
    </form>
  )
}

export default Form