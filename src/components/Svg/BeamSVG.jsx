const BeamSVG = ({beamParams}) => <>
  <line x1="0" x2={beamParams.length} id="beam-svg" />
  <g id="supports-group-svg">
    { beamParams.supports.map(support => (
      <use key={support} href="#support-def-svg" x={support} />
    ))}
  </g>
</>

export default BeamSVG