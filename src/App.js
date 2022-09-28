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

  console.log(beamParams)

  const [results, setResults] = useState({})
  const [viewMode, setViewMode] = useState('LOADS')
  const [pointerCoordinates, setPointerCoordinates] = useState()

  /*
  function setAttributesSVG (element, attributes) {
    if (!attributes) return
    for (let [key, value] of Object.entries(attributes)) {
      element.setAttributeNS(null, key, value)
    }
  }
  
  function getElementByName (name, container = document) {
    return container.querySelector(`[name="${name}"]`)
  }
  
  function getInputValue (name, container = document) { 
    return Number(getElementByName(name, container).value) || 0
  }
  
  function assertGroupLength(group, neededlength, tag, attributes) {
    while (group.children.length < neededlength) {
      addElementSVG(tag, group, attributes)
    }
  }
  
  function drawSVG () {
    const svg = document.querySelector('svg')
    resetSvg()
  
    // Beam Length
    setAttributesSVG(document.querySelector('#beam-svg'), { 'x2': ''+ beamObj.length })
    
    // Supports
    const supportsSVGGroup = document.querySelector('#supports-group-svg')
    assertGroupLength(supportsSVGGroup, beamObj.supports.length, "use", { "href": "#support-def-svg" })
    for (let i=0; i < supportsSVGGroup.children.length; i++) {
      if (beamObj.supports[i] || beamObj.supports[i] === 0) {
        setAttributesSVG(supportsSVGGroup.children[i], {
          'x': ''+beamObj.supports[i],
          'visibility': 'visible'
        })
      } else {
        setAttributesSVG(supportsSVGGroup.children[i], {
          'visibility': 'hidden'
        })
      }
    }
  
    const offsetDx = beamObj.length/1000
    switch (viewMode) {
      case 'SHEAR':
        const shearForceGroup = document.querySelector('#shearforce-group-svg')
        let shearPath = `M${SMALL_DX} 0 `
        results.edges.forEach(edge => {
          shearPath += `L${edge.startNode.x + SMALL_DX} ${-results.shearForce(edge.startNode.x)*SVG_Y_SCALE} `
          for (let x = edge.startNode.x + SMALL_DX; x <= edge.endNode.x - SMALL_DX; x += offsetDx) {
            shearPath += `L${x} ${-results.shearForce(x)*SVG_Y_SCALE} `
          }
          shearPath += `L${edge.endNode.x - SMALL_DX} 0 `
          const startValue = results.shearForce(edge.startNode.x + SMALL_DX)
          addTextSVG(startValue.toFixed(2).toLocaleString(),
            shearForceGroup,
            edge.startNode.x,
            -(startValue*SVG_Y_SCALE + (startValue > 0 ? FONT_SIZE : 0))
          )
          const endValue = results.shearForce(edge.endNode.x - SMALL_DX)
          addTextSVG(endValue.toFixed(2).toLocaleString(),
            shearForceGroup,
            edge.endNode.x,
            -(endValue*SVG_Y_SCALE + (endValue > 0 ? FONT_SIZE : 0))
          )
        })
        addElementSVG('path', shearForceGroup, {'d': shearPath})
        break;
      case 'MOMENTS':
        let previousValues = {
          "x-1": 0,
          "x-2": 0,
          "Mx-1": 0,
          "Mx-2": 0
        }
        let extremeValues = []
        const bendingMomentGroup = document.querySelector('#bending-moment-group-svg')
        let momentPath = `M${SMALL_DX} 0 `
        for (let x = 0; x <= beamObj.length; x += offsetDx) {
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
        extremeValues.forEach(({x, value}) => {
          addTextSVG(
            value.toFixed(2),
            bendingMomentGroup,
            x,
            value*SVG_Y_SCALE
          )
          addElementSVG('line', bendingMomentGroup, {'x1': x, 'x2': x, 'y1': 0, 'y2': value*SVG_Y_SCALE})
        })
        addElementSVG('path', bendingMomentGroup, {'d': momentPath})
        break;
      case 'REACTIONS':
        const reactionsSVGGroup = document.querySelector('#reactions-group-svg')
        assertGroupLength(reactionsSVGGroup, results.reactions.length, "g")
        results.reactions.forEach((reaction, i) => {
          if (!reaction) {
            setAttributesSVG(reactionsSVGGroup.children[i], {
              'visibility': 'hidden'
            })
          } else {
            removeAllChildren(reactionsSVGGroup.children[i])
            
            addElementSVG('use', reactionsSVGGroup.children[i], {
              'href': ((reaction >= 0) ? '#up-reaction-force-svg' : '#down-reaction-force-svg'),
              'x': results.nodes[i].x.toString(),
            })
      
            addTextSVG(reaction.toFixed(2).toLocaleString(),
              reactionsSVGGroup.children[i],
              results.nodes[i].x + 0.1,
              (reaction >= 0) ? 1.0 : 1.0 + FONT_SIZE
            )
            
            setAttributesSVG(reactionsSVGGroup.children[i], {
              'visibility': 'visible',
            })
          }
        })
        break;
      case 'LOADS':
        const loadTextsSVGGroup = document.querySelector('#load-texts-group-svg')
        const distributedLoadsSVGGroup = document.querySelector('#distributed-loads-group-svg')
        assertGroupLength(distributedLoadsSVGGroup, beamObj.distributedLoads.length, "polygon")
        for (let i=0; i < distributedLoadsSVGGroup.children.length; i++) {
          const load = beamObj.distributedLoads[i]
          setAttributesSVG(distributedLoadsSVGGroup.children[i], {
            'points':
              `${load.x0},-${SVG_OFFSET} ` +
              `${load.xf},-${SVG_OFFSET} ` +
              `${load.xf},-${load.endValue*SVG_Y_SCALE+SVG_OFFSET} ` +
              `${load.x0},-${load.startValue*SVG_Y_SCALE+SVG_OFFSET}`,
            'visibility': 'visible'
          })
  
          addTextSVG(load.startValue.toFixed(2).toLocaleString(),
            loadTextsSVGGroup,
            load.x0,
            - (load.startValue*SVG_Y_SCALE+SVG_OFFSET+FONT_SIZE)
          )
  
          if (load.startValue != load.endValue) {
            addTextSVG(load.endValue.toFixed(2).toLocaleString(),
            loadTextsSVGGroup,
            load.xf,
            - (load.endValue*SVG_Y_SCALE+SVG_OFFSET+FONT_SIZE)
          )}
        }
        break;
    }
  
    zoomSVG()
  }
  

  function resetViewMode() {
    const viewModeSelector = getElementByName('view-mode')
    viewModeSelector.selectedIndex = 0
    viewMode = 'LOADS'
  }
 
  function updateViewMode(newViewMode) {
    if (newViewMode !== 'LOADS') recalculate()
    setViewMode(newViewMode)
  }
  */

  function updateProperty (propertyName, newValue) {
    const newBeamParams = {...beamParams}
    newBeamParams[propertyName] = Number(newValue)
    setBeamParams(newBeamParams)
    recalculate()
  }
  
  function updateSupports (newSupports) {
    setBeamParams({...beamParams, supports: newSupports.sort((a, b) => a - b)})
    recalculate() 
  }
  
  /*
  function updateLoads (shouldDraw = true) {
    resetViewMode()
    resetResults()
    const distributedLoadFieldsets = document.querySelectorAll('[name="distributedload"]')
    let distributedLoads = []
    distributedLoadFieldsets.forEach(loadFieldset => {
      distributedLoads.push({
        startValue: getInputValue("startValue", loadFieldset),
        endValue: getInputValue("endValue", loadFieldset),
        x0: getInputValue("x0", loadFieldset),
        xf: getInputValue("xf", loadFieldset)
      })
    })
    beamObj.distributedLoads = distributedLoads
    
    if (shouldDraw) { 
      drawSVG()
      resetViewMode()
    }
  }
  
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

  function recalculate() {
    const nodes = Node.createFixNodes(beamParams.supports)
    if (nodes[0].x > 0) nodes.unshift({x: 0, yFix: false})
    if (nodes[nodes.length - 1].x < beamParams.length) nodes.push({x: beamParams.length, yFix: false})
    
    const distributedLoads = beamParams.distributedLoads.map(
      load => new DistributedLoad(load.startValue, load.endValue, load.x0, load.xf)
    )
  
    setResults(new Beam(nodes, distributedLoads))
  }
  
  /*
  function removeAllChildren(parentElement) {
    if (!parentElement) return 
    while (parentElement.children.length > 0) {
      parentElement.removeChild(parentElement.lastChild)
    }
  }
  */

  /*
  function resetSvg() {
    removeAllChildren(document.querySelector('#distributed-loads-group-svg'))
    removeAllChildren(document.querySelector('#reactions-group-svg'))
    removeAllChildren(document.querySelector('#shearforce-group-svg'))
    removeAllChildren(document.querySelector('#bending-moment-group-svg'))
    removeAllChildren(document.querySelector('#load-texts-group-svg'))
    const highlightLine = document.querySelector('#highlight-line')
    setAttributesSVG(highlightLine, { visibility: 'hidden' })
  }
  
  function addElementSVG(selector, container, attributes, content = '') {
    const [tag, ...classes] = selector.split('.')
    
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag)
    setAttributesSVG(element, attributes)
    if (tag === 'text' && content) element.textContent = content
    if (classes.length > 0) classes.forEach(c => element.classList.add(c))
    container.appendChild(element)
    return element
  }
  
  function addTextSVG(text, container, x, y, attributes) {
    addElementSVG('text', container, {
        x: (x + TEXT_OFFSET).toString(),
        y: (y + TEXT_OFFSET).toString(),
        'font-size': FONT_SIZE,
        ...attributes
      }, text)
  }
  */

  /*
    <Controls results={results} setResults={setResults} beamParams={beamParams} setBeamParams={setBeamParams} updateViewMode={updateViewMode} />
  */  
  
  return (
    <div className="App">
      <div className="svg-wrapper">
        <Svg results={results} beamParams={beamParams} />
      </div>
      
      <BeamForm
        beamParams={beamParams}
        setBeamParams={setBeamParams}
        updateProperty={updateProperty}
        updateSupports={updateSupports}
      />
    </div>
  );
}

export default App;
