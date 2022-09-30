import { Fragment } from "react"
import TextSVG from "./TextSVG"

const LoadsSVG = ({isBlurred, punctualLoads, distributedLoads, SVG_OFFSET, SVG_Y_SCALE}) => (
  <g className={isBlurred ? 'blurred' : ''} id="distributed-loads-group-svg">
    { distributedLoads.map((load, index) => (
      <Fragment key={`distLoad${index}`}>
        <polygon points={
          `${load.x0},${-SVG_OFFSET} `+
          `${load.xf},${-SVG_OFFSET} `+
          `${load.xf},${-load.endValue*SVG_Y_SCALE-SVG_OFFSET} `+
          `${load.x0},${-load.startValue*SVG_Y_SCALE-SVG_OFFSET}`
        }/>
        <TextSVG
          x={load.x0}
          y={-load.startValue*SVG_Y_SCALE-SVG_OFFSET}
          content={load.startValue}
        />
        { load.startValue !== load.endValue ? (
          <TextSVG 
            x={load.xf}
            y={-load.endValue*SVG_Y_SCALE-SVG_OFFSET}
            content={load.endValue}
          />
        ) : null }
      </Fragment>
    ))}
  </g>
)

export default LoadsSVG