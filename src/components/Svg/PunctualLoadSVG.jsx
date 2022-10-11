import TextSVG from "./TextSVG"

const PunctualLoadSVG = ({value, x}) => {
  const y1 = value > 0 ? -0.1 : -1.5
  const y2 = value > 0 ? -1.5 : -0.1
  const dyHead = value > 0 ? -0.5 : 0.5
  const dxHead = 0.08
  const points = `${x-dxHead},${y1+dyHead} ${x},${y1} ${x+dxHead},${y1+dyHead}`

  return <>
    <g id="force-svg" className="load-arrow">
      <line x1={x} x2={x} y1={y1} y2={y2} />
      <polyline points={points} />
    </g>
    <TextSVG x={x} y={-1.5} anchor={'middle'} content={value} />
  </> 
}

export default PunctualLoadSVG