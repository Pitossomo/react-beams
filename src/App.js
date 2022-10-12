import { Beam, DistributedLoad, Node, PunctualLoad } from "beamsjs"
import Svg from "./components/Svg"
import BeamForm from "./components/BeamForm"
import Controls from "./components/Controls"
import { useRef, useState } from "react"

function App() {
  const x0 = Math.random()*2
  const [beamParams, setBeamParams] = useState({
    length: 10,
    young: 25,
    width: 0.14,
    height: 0.30,
    supports: [0, 3.3, 6.7, 10],
    distributedLoads: [{
      startValue: Math.random()*10,
      endValue: Math.random()*10,
      x0: x0,
      xf: Math.min(x0 + Math.random()*10,10) 
    }],
    punctualLoads: [{
      value: Math.random()*10,
      x: Math.random()*10
    }]
  })

  const svgRef = useRef()
  const [results, setResults] = useState({})
  const [viewMode, setViewMode] = useState('LOADS')
  const [pointerCoordinates, setPointerCoordinates] = useState()
  
  function updateViewMode(newViewMode) {
    if (viewMode === 'LOADS' && newViewMode !== 'LOADS') recalculate(beamParams)
    else setPointerCoordinates()
    setViewMode(newViewMode)
  }
  
  function updateProperty (propertyName, newValue) {
    const newBeamParams = {...beamParams}
    newBeamParams[propertyName] = Number(newValue)
    if (propertyName === 'length') {
      let newDistributedLoads = beamParams.distributedLoads.reduce((accum, load) => {
        if (load.x0 >= newValue) return accum
        if (load.xf > newValue) accum.push({...load, xf: newValue})
        else accum.push({...load})
        return accum
      }, [])
      let newSupports = beamParams.supports.filter(x => x <= newValue)
      newBeamParams.supports = newSupports
      newBeamParams.distributedLoads = newDistributedLoads
    }
    
    setBeamParams(newBeamParams)
    recalculate(newBeamParams)
  }
  
  function updateSupports (newSupports) {
    const newBeamParams = {...beamParams, supports: newSupports.sort((a, b) => a - b)}
    setBeamParams(newBeamParams)
    recalculate(newBeamParams)
  }
  
  function updateDistributedLoads (newDistributedLoads) {
    const newBeamParams = {...beamParams, distributedLoads: newDistributedLoads}
    setBeamParams(newBeamParams)
    recalculate(newBeamParams)
  }

  function updatePunctualLoads (newPunctualLoads) {
    const newBeamParams = {...beamParams, punctualLoads: newPunctualLoads}
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

    const punctualLoads = params.punctualLoads.map(load => (
      new PunctualLoad(load.value, load.x)
    ))

    const inertia = beamParams.width*beamParams.height**3/12

    setPointerCoordinates()
    setResults(new Beam(
      nodes,
      distributedLoads,
      punctualLoads,
      beamParams.young*10**9*inertia
    ))
  }

  function updatePointerCoordinates ({clientX, clientY}) {
    let point = new DOMPoint(clientX, clientY)
    point = point.matrixTransform(svgRef.current.getScreenCTM().inverse())

    const xValue = Math.min(Math.max(0, point.x), beamParams.length)
    
    let yValue
    switch (viewMode) {
      case 'SHEAR':
        yValue = results.shearForce(xValue)
        break
      case 'MOMENTS':
        yValue = results.bendingMoment(xValue)
        break
      default:
        setPointerCoordinates()
        return
    }

    setPointerCoordinates({x: xValue, y: yValue})
  }

  return (
    <div className="App">
      <div className="svg-wrapper">
        <Svg 
          svgRef={svgRef}
          results={results}
          beamParams={beamParams}
          viewMode={viewMode}
          pointerCoordinates={pointerCoordinates}
          updatePointerCoordinates={updatePointerCoordinates}
        />
        <Controls 
          viewMode={viewMode} updateViewMode={updateViewMode} 
          pointerCoordinates={pointerCoordinates}
        />
      </div>
      
      <BeamForm
        beamParams={beamParams}
        setBeamParams={setBeamParams}
        updateDistributedLoads={updateDistributedLoads}
        updatePunctualLoads={updatePunctualLoads}
        updateProperty={updateProperty}
        updateSupports={updateSupports}
      />
    </div>
  );
}

export default App;
