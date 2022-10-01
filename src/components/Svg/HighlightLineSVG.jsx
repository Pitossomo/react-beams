import { SVG_Y_SCALE } from "../../utils/constants"

const HighlightLine = ({viewMode, pointerCoordinates}) => {
  if (!pointerCoordinates || viewMode === 'LOADS' || viewMode === 'REACTIONS') return null 
  
  return <line id="highlight-line"
    x1={pointerCoordinates.x} 
    x2={pointerCoordinates.x}
    y1="0"
    y2={-pointerCoordinates.y*SVG_Y_SCALE*(viewMode === 'MOMENTS' ? -1 : 1)}
  /> 
}

export default HighlightLine