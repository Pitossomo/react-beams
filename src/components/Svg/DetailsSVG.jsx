import { Fragment } from "react"

const DetailsSVG = ({beamParams, results}) => {
  return <Fragment>
    <line x1='0' x2='0' y1='0' y2={beamParams.height} />
    <line x1='0' x2={beamParams.length} y1={beamParams.height} y2={beamParams.height} />
    <line x1={beamParams.length} x2={beamParams.length} y1='0' y2={beamParams.height} />
    <line x1='0' x2={beamParams.length} y1='0' y2='0' />
  </Fragment>
}

export default DetailsSVG