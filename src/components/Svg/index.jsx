import HighlightLine from "./Shared/HighlightLineSVG"
import SvgResults from "./Outputs/SvgResults"
import './style.css'
import Defs from "./Shared/Defs"
import BeamSVG from "./Shared/BeamSVG"
import SVGNav from "./Shared/SVGNav"

const Svg = ({svgRef, viewMode, beamParams, results, pointerCoordinates, updatePointerCoordinates}) => {
  return <>
    <svg id="drawing-area" xmlns="http://www.w3.org/2000/svg"
      ref={svgRef} viewBox={`${-1.5} ${-3} ${beamParams.length + 3} ${6}`}
      onMouseMove={updatePointerCoordinates}
    >      
      <Defs />
      <g id="svg-elements">
        { viewMode !== 'STEEL_AREA' ? <BeamSVG beamParams={beamParams} /> : null }
        <SvgResults viewMode={viewMode} beamParams={beamParams} results={results} />
        <HighlightLine viewMode={viewMode} pointerCoordinates={pointerCoordinates} />
      </g>  
    </svg>
    <SVGNav />
  </>
}

export default Svg
