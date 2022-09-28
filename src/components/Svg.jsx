const Svg = ({updateCoordinates}) => (
  <svg onMouseMove={updateCoordinates} viewbox="-1 -1 7 3" id="drawing-area" xmlns="http://www.w3.org/2000/svg">      
    <defs>
      <g id="support-def-svg">
        <polygon points="-0.1,0.2 0.1,0.2 0,0.03" />
        <line x1="-0.1" x2="0.1" y1="0.25" y2="0.25" /> 
      </g>
      <pattern id="vertical-lines-pattern" width="0.1" height="0.1" viewBox="0 0 40 40" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
        <path d="M-10 30h60v1h-60zM-10-10h60v1h-60" fill="rgba(0, 0, 0, 1)"/>
      </pattern>
      <g id="up-reaction-force-svg" class="reaction-arrow">
        <line x1="0" x2="0" y1="0.5" y2="1.0" />
        <polyline points="-0.1,0.7 0,0.5 0.1,0.7" />
      </g>
      <g id="down-reaction-force-svg" class="reaction-arrow">
        <line x1="0" x2="0" y1="0.5" y2="1.0" />
        <polyline points="-0.1,0.8 0,1.0 0.1,0.8" />
      </g>
    </defs>  
    <g id="svg-elements">
      <line x1="0" x2="5" id="beam-svg" />
      <g id="supports-group-svg">
      </g>
      <g id="load-texts-group-svg"></g>
      <g id="distributed-loads-group-svg">
        <polygon points="0,-0.1 5,-0.1 5,-1.1 0,-0.6" />  
      </g>
      <g id="reactions-group-svg"></g>
      <g id="shearforce-group-svg"></g>
      <g id="bending-moment-group-svg"></g>
      <line id="highlight-line" x1="0" x2="0" y1="0" y2="0" />
    </g>
  </svg>
)

export default Svg
