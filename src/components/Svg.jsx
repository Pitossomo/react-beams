import LoadsSVG from "./LoadsSVG";
import SvgElements from "./SvgElements";

const SVG_Y_SCALE = 0.1
const SVG_OFFSET = 0.1

const Svg = ({viewMode, beamParams, results, updateCoordinates}) => {
  const viewBox = `${-1} ${-3} ${beamParams.length + 2} ${6}`

  return (
    <svg onMouseMove={updateCoordinates} viewBox={viewBox} id="drawing-area" xmlns="http://www.w3.org/2000/svg">      
      <defs>
        <g id="support-def-svg">
          <polygon points="-0.1,0.2 0.1,0.2 0,0.03" />
          <line x1="-0.1" x2="0.1" y1="0.25" y2="0.25" /> 
        </g>
        <pattern id="vertical-lines-pattern" width="0.1" height="0.1" viewBox="0 0 40 40" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
          <path d="M-10 30h60v1h-60zM-10-10h60v1h-60" fill="rgba(0, 0, 0, 1)"/>
        </pattern>
        <g id="up-reaction-force-svg" className="reaction-arrow">
          <line x1="0" x2="0" y1="0.5" y2="1.0" />
          <polyline points="-0.1,0.7 0,0.5 0.1,0.7" />
        </g>
        <g id="down-reaction-force-svg" className="reaction-arrow">
          <line x1="0" x2="0" y1="0.5" y2="1.0" />
          <polyline points="-0.1,0.8 0,1.0 0.1,0.8" />
        </g>
      </defs>
      <g id="svg-elements">
        <line x1="0" x2={beamParams.length} id="beam-svg" />
        <g id="supports-group-svg">
          { beamParams.supports.map(support => (
            <use key={support} href="#support-def-svg" x={support} />
          ))}
        </g>
        <SvgElements viewMode={viewMode} beamParams={beamParams} results={results} />
        <line id="highlight-line" x1="0" x2="0" y1="0" y2="0" />
      </g>  
    </svg>
  )
}

export default Svg
