import { Fragment } from "react"
import { SVG_OFFSET, SVG_Y_SCALE } from "../../utils/constants"
import TextSVG from "./TextSVG"

const LoadsSVG = ({isBlurred, punctualLoads, distributedLoads}) => (
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
          y={-load.startValue*SVG_Y_SCALE}
          content={load.startValue}
          anchor='end'
        />
        { load.startValue !== load.endValue ? (
          <TextSVG 
            x={load.xf}
            y={-load.endValue*SVG_Y_SCALE}
            content={load.endValue}
            anchor='start'
          />
        ) : null }
      </Fragment>
    ))}
  </g>
)

export default LoadsSVG