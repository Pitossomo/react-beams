import { Beam, DistributedLoad, Node, PunctualLoad } from "beamsjs"
import Svg from "./components/Svg"
import BeamForm from "./components/BeamForm"
import Controls from "./components/Controls"
import { useState } from "react"

function App() {
  const [beamParams, setBeamParams] = useState({
    length: 10,
    young: 1,
    inertia: 1,
    supports: [0, 3.3, 6.7, 10],
    distributedLoads: [{
      startValue: 5,
      endValue: 10,
      x0: 0,
      xf: 10 
    }]
  })

  const [results, setResults] = useState({})
  const [viewMode, setViewMode] = useState('LOADS')
  const [pointerCoordinates, setPointerCoordinates] = useState()

  function updateViewMode(newViewMode) {
    if (viewMode === 'LOADS' && newViewMode !== 'LOADS') recalculate(beamParams)
    setViewMode(newViewMode)
  }
  
  function updateProperty (propertyName, newValue) {
    const newBeamParams = {...beamParams}
    newBeamParams[propertyName] = Number(newValue)
    setBeamParams(newBeamParams)
    recalculate(newBeamParams)
  }
  
  function updateSupports (newSupports) {
    const newBeamParams = {...beamParams, supports: newSupports.sort((a, b) => a - b)}
    setBeamParams(newBeamParams)
    recalculate(newBeamParams)
  }
  
  function updateLoads (loadIndex, propertyName, newValue) {
    const newDistributedLoads = [...beamParams.distributedLoads]
    newDistributedLoads[loadIndex] = {...(newDistributedLoads[loadIndex])}
    newDistributedLoads[loadIndex][propertyName] = Number(newValue)
    const newBeamParams = {...beamParams, distributedLoads: newDistributedLoads}
    setBeamParams(newBeamParams)
    recalculate(newBeamParams)
  }
  
  function recalculate(params) {
    const nodes = Node.createFixNodes(params.supports)
    if (nodes[0].x > 0) nodes.unshift({x: 0, yFix: false})
    if (nodes[nodes.length - 1].x < params.length) nodes.push({x: params.length, yFix: false})
    
    const distributedLoads = params.distributedLoads.map(load => (
      new DistributedLoad(load.startValue, load.endValue, load.x0, load.xf)
    ))
    setResults(new Beam(nodes, distributedLoads))
  }

  /*
  function updateCoordinates ({clientX, clientY}) {
    const svg = document.querySelector('#drawing-area')
    let point = new DOMPoint(clientX, clientY)
    point = point.matrixTransform(svg.getScreenCTM().inverse())
  
    const xSpan = document.querySelector("#x-value")
    const ySpan = document.querySelector("#y-value")
    
    if (point.x < 0) point.x = 0
    else if (point.x > beamObj.length) point.x = beamObj.length
  
    xSpan.innerHTML = point.x.toFixed(2).toLocaleString()
    const highlightLine = document.querySelector('#highlight-line')
    let yValue, ySign
  
    switch (viewMode) {
      case 'SHEAR':
        yValue = results.shearForce(point.x)
        ySign = 1
        break;
      case 'MOMENTS':
        yValue = results.bendingMoment(point.x)
        ySign = -1
        break;
      default:
        ySpan.innerHTML = '-'
        setAttributesSVG(highlightLine, { visibility: "hidden" })
        return
    }
  
    setAttributesSVG(highlightLine, { 
      x1: point.x,
      x2: point.x,
      y2: -yValue*SVG_Y_SCALE*ySign,
      visibility: yValue ? "visible" : "hidden"
    })
    ySpan.innerHTML = yValue.toFixed(2).toLocaleString()
  }
  */

  return (
    <div className="App">
      <div className="svg-wrapper">
        <Svg results={results} beamParams={beamParams} viewMode={viewMode} />
        <Controls viewMode={viewMode} updateViewMode={updateViewMode} />
      </div>
      
      <BeamForm
        beamParams={beamParams}
        setBeamParams={setBeamParams}
        updateLoads={updateLoads}
        updateProperty={updateProperty}
        updateSupports={updateSupports}
      />
    </div>
  );
}

export default App;
