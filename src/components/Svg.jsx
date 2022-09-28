import { Fragment, useEffect } from "react";

const Svg = ({beamParams, results, updateCoordinates}) => {
  const viewBox = `${-1} ${-3} ${beamParams.length + 2} ${6}`

  const SVG_Y_SCALE = 0.1
  const SVG_OFFSET = 0.1
  const SMALL_DX = 0.000000001
  const TEXT_OFFSET = 0.1

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
        <g id="load-texts-group-svg"></g>
        <g id="distributed-loads-group-svg">
          { beamParams.distributedLoads.map((load, index) => (
            <Fragment key={`distLoad${index}`}>
              <polygon points={
                `${load.x0},${-SVG_OFFSET} `+
                `${load.xf},${-SVG_OFFSET} `+
                `${load.xf},${-load.endValue*SVG_Y_SCALE-SVG_OFFSET} `+
                `${load.x0},${-load.startValue*SVG_Y_SCALE-SVG_OFFSET}`
              }/>
              <text
                className="load-text"
                x={load.x0}
                y={-load.startValue*SVG_Y_SCALE-SVG_OFFSET-TEXT_OFFSET}
              >
                {load.startValue.toFixed(2)}
              </text>
              
              { load.startValue !== load.endValue ? (
                <text 
                  className="load-text"
                  x={load.xf}
                  y={-load.endValue*SVG_Y_SCALE-SVG_OFFSET-TEXT_OFFSET}
                >
                  {load.endValue.toFixed(2)}
                </text>
              ) : null }
            </Fragment>
          ))}
        </g>
        <g id="reactions-group-svg"></g>
        <g id="shearforce-group-svg"></g>
        <g id="bending-moment-group-svg"></g>
        <line id="highlight-line" x1="0" x2="0" y1="0" y2="0" />
      </g>
    </svg>
  )
}

export default Svg
