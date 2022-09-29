import { Fragment } from "react"
import TextSVG from "./TextSVG"

const SVG_Y_SCALE = 0.1
const SVG_OFFSET = 0.1
const SMALL_DX = 0.000000001
const TEXT_OFFSET = 0.1
const OFFSET_DX = 1/1000

const SvgElements = ({viewMode, beamParams, results}) => {
  console.log(viewMode)
  switch (viewMode) {
    case 'LOADS':
      return <Fragment>
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
      </Fragment>

    case 'SHEAR':
      let shearPath = `M${SMALL_DX} 0 `
      results.edges.forEach(edge => {
        shearPath += `L${edge.startNode.x + SMALL_DX} ${-results.shearForce(edge.startNode.x)*SVG_Y_SCALE} `
        for (let x = edge.startNode.x + SMALL_DX; x <= edge.endNode.x - SMALL_DX; x += OFFSET_DX) {
          shearPath += `L${x} ${-results.shearForce(x)*SVG_Y_SCALE} `
        }
        shearPath += `L${edge.endNode.x - SMALL_DX} 0 `
      })
      return <g id="shearforce-group-svg">
        <path d={shearPath}/>
        {
          results.edges.map(edge => {
            const startValue = results.shearForce(edge.startNode.x + SMALL_DX)
            const endValue = results.shearForce(edge.endNode.x - SMALL_DX)

            return (
              <Fragment key={`edge${edge.startNode.x}`}>
                <TextSVG x={edge.startNode.x} y={-startValue*SVG_Y_SCALE} content={startValue} />
                <TextSVG x={edge.endNode.x} y={-endValue*SVG_Y_SCALE} content={endValue} />
              </Fragment>
            )
          })
        }
      </g>

    case 'MOMENTS':
      let previousValues = {
        "x-1": 0,
        "x-2": 0,
        "Mx-1": 0,
        "Mx-2": 0
      }
      let extremeValues = []
      let momentPath = `M${SMALL_DX} 0 `
      for (let x = 0; x <= beamParams.length; x += OFFSET_DX) {
        let momentX = results.bendingMoment(x)
        momentPath += `L${x} ${momentX*SVG_Y_SCALE} `
        if (
          Math.abs(previousValues["Mx-2"]) < Math.abs(previousValues["Mx-1"]) 
          && Math.abs(momentX) < Math.abs(previousValues["Mx-1"])
        ) extremeValues.push({x: previousValues["x-1"], value: previousValues["Mx-1"]})

        previousValues["Mx-2"] = previousValues["Mx-1"]
        previousValues["x-2"] = previousValues["x-1"]
        previousValues["Mx-1"] = momentX
        previousValues["x-1"] = x
      }

      return <g id="bending-moment-group-svg">
        <path d={momentPath} />
        { extremeValues.map(({x, value}) => (
          <Fragment key={`extremeValue${x}`}>
            <TextSVG x={x} y={value*SVG_Y_SCALE} content={value} />
            <line x1={x} x2={x} y1='0' y2={value*SVG_Y_SCALE} />
          </Fragment> 
        ))
        }
      </g>
  }
}

export default SvgElements