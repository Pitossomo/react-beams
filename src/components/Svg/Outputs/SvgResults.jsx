import { Fragment } from "react"
import { OFFSET_DX, SMALL_DX, SVG_OFFSET, SVG_Y_SCALE } from "../../../utils/constants"
import DetailsSVG from "./Details"
import LoadsSVG from "../Inputs/LoadsSVG"
import TextSVG from "../Shared/TextSVG"

const SvgResults = ({viewMode, beamParams, results}) => {
  const DrawLoads = ({isBlurred}) => (
    <LoadsSVG 
      distributedLoads={beamParams.distributedLoads}
      punctualLoads={beamParams.punctualLoads}
      SVG_OFFSET={SVG_OFFSET}
      SVG_Y_SCALE={SVG_Y_SCALE}
      isBlurred={isBlurred}
    />
  )

  switch (viewMode) {
    case 'SHEAR':
      let shearPath = `M${SMALL_DX} 0 `
      results.edges.forEach(edge => {
        shearPath += `L${edge.startNode.x + SMALL_DX} ${-results.shearForce(edge.startNode.x)*SVG_Y_SCALE} `
        for (let x = edge.startNode.x + SMALL_DX; x <= edge.endNode.x - SMALL_DX; x += OFFSET_DX) {
          shearPath += `L${x} ${-results.shearForce(x)*SVG_Y_SCALE} `
        }
        shearPath += `L${edge.endNode.x - SMALL_DX} 0 `
      })

      return <Fragment>
        <DrawLoads isBlurred={true} />
        <g id="shearforce-group-svg">
          <path d={shearPath}/>
          {
            results.edges.map(edge => {
              const startValue = results.shearForce(edge.startNode.x + SMALL_DX)
              const endValue = results.shearForce(edge.endNode.x - SMALL_DX)
              
              return (
                <Fragment key={`edge${edge.startNode.x}`}>
                  { Number(startValue.toFixed(2)) 
                    ? <TextSVG x={edge.startNode.x} y={-startValue*SVG_Y_SCALE} content={startValue} anchor='start'/>
                    : null
                  }
                  { Number(endValue.toFixed(2))
                    ? <TextSVG x={edge.endNode.x} y={-endValue*SVG_Y_SCALE} content={endValue} anchor='end' />
                    : null 
                  }
                </Fragment>
              )
            })
          }
        </g>
      </Fragment> 
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
          momentX && previousValues["Mx-1"] && previousValues["Mx-2"]
          && Math.abs(previousValues["Mx-2"]) < Math.abs(previousValues["Mx-1"]) 
          && Math.abs(momentX) < Math.abs(previousValues["Mx-1"])
        ) extremeValues.push({x: previousValues["x-1"], value: previousValues["Mx-1"]})

        previousValues["Mx-2"] = previousValues["Mx-1"]
        previousValues["x-2"] = previousValues["x-1"]
        previousValues["Mx-1"] = momentX
        previousValues["x-1"] = x
      }
      return <Fragment>
        <DrawLoads isBlurred={true} />
        <g id="bending-moment-group-svg">
          <path d={momentPath} />
          { extremeValues.map(({x, value}) => (
            <Fragment key={`extremeValue${x}`}>
              <TextSVG x={x} y={value*SVG_Y_SCALE + Math.sign(value)*SVG_OFFSET} content={value} anchor='middle' />
              <line x1={x} x2={x} y1='0' y2={value*SVG_Y_SCALE} />
            </Fragment> 
          ))
          }
        </g>  
      </Fragment>
    case 'REACTIONS':
      return (
        <Fragment>
          <DrawLoads />
          { results.reactions.map((reaction, i) => {
            if (!reaction) return null
            return <Fragment key={`reaction${i}`}>
              <use 
                href={(reaction >= 0 ? '#up' : '#down')+'-reaction-force-svg'}
                x={results.nodes[i].x}
              />
              <TextSVG x={results.nodes[i].x} y={1} content={reaction} />
            </Fragment>
          })}
        </Fragment>
      )
    case 'STEEL_AREA':
      const areas = []
      let areaPath = `M${SMALL_DX} 0 `
      
      for (let x = 0; x <= beamParams.length; x += OFFSET_DX) {
        const areaX = Math.max(8*beamParams.width*beamParams.height, 2*results.bendingMoment(x)/(beamParams.fyk*beamParams.height)*100)
        areas.push(areaX)
        areaPath += `L${x} ${areaX*SVG_Y_SCALE} `
      }

      return (
        <Fragment>
          <DrawLoads isBlurred={true} />
          <g id="steel-area-group-svg">
            <path d={areaPath} />
            <DetailsSVG beamParams={beamParams} results={results} />
          </g>
        </Fragment>
      )
    default:
      return <DrawLoads />
  }
}

export default SvgResults