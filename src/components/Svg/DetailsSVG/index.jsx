import { Fragment } from "react"
import './style.css'

const DetailsSVG = ({beamParams, results}) => {
  return <Fragment>
    <line x1='0' x2='0' y1='0' y2={-beamParams.height} />
    <line x1='0' x2={beamParams.length} y1={-beamParams.height} y2={-beamParams.height} />
    <line x1={beamParams.length} x2={beamParams.length} y1='0' y2={-beamParams.height} />
    <line x1='0' x2={beamParams.length} y1='0' y2='0' />

    <path className='steelBar negative' d={`
      M${beamParams.cover} -${(beamParams.height-beamParams.cover-beamParams.height/2)}
      L${beamParams.cover} -${beamParams.height-beamParams.cover}
      L${beamParams.length - beamParams.cover} -${beamParams.height-beamParams.cover}
      L${beamParams.length - beamParams.cover} -${beamParams.height-beamParams.cover-beamParams.height/2}
    `} />

    <path className='steelBar positive' d={`
      M${beamParams.cover} -${(beamParams.cover+beamParams.height/2)}
      L${beamParams.cover} -${beamParams.cover}
      L${beamParams.length - beamParams.cover} -${beamParams.cover}
      L${beamParams.length - beamParams.cover} -${beamParams.cover+beamParams.height/2}
    `} />

  </Fragment>
}

export default DetailsSVG