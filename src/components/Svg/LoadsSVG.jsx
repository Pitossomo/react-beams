import { Fragment } from "react"
import { SVG_OFFSET, SVG_Y_SCALE } from "../../utils/constants"
import PunctualLoadSVG from "./PunctualLoadSVG"
import TextSVG from "./TextSVG"

const LoadsSVG = ({isBlurred, punctualLoads, distributedLoads}) => <>
  <g className={isBlurred ? 'blurred' : ''} id="distributed-loads-group-svg">
    { distributedLoads.map(({x0, xf, endValue, startValue}, index) => (
      <Fragment key={`distLoad${index}`}>
        <polygon points={
          `${x0},${-SVG_OFFSET} `+
          `${xf},${-SVG_OFFSET} `+
          `${xf},${-endValue*SVG_Y_SCALE-SVG_OFFSET} `+
          `${x0},${-startValue*SVG_Y_SCALE-SVG_OFFSET}`
        }/>
        <TextSVG
          x={x0}
          y={-startValue*SVG_Y_SCALE}
          content={startValue}
          anchor='end'
        />
        { startValue !== endValue ? (
          <TextSVG 
            x={xf}
            y={-endValue*SVG_Y_SCALE}
            content={endValue}
            anchor='start'
          />
        ) : null }
      </Fragment>
    ))}
  </g>
  <g className={isBlurred ? 'blurred' : ''} id="punctual-loads-group-svg">
    { punctualLoads.map(({value, x}, index) => (
      <PunctualLoadSVG key={`pLoad${index}`} value={value} x={x} />
    ))}
  </g>
</>

export default LoadsSVG