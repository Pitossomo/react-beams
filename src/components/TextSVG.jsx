const SVG_Y_SCALE = 0.1
const TEXT_OFFSET = 0.1

const TextSVG = ({x, y, content}) => (
  <text 
    x={x + TEXT_OFFSET}
    y={-y*SVG_Y_SCALE}
  >
    {content.toFixed(2).toLocaleString()}
  </text>
)

export default TextSVG