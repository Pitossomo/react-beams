const TEXT_OFFSET = 0.1

const TextSVG = ({x, y, content}) => (
  <text 
    x={x + TEXT_OFFSET}
    y={y + Math.sign(y)*TEXT_OFFSET}
  >
    {content.toFixed(2).toLocaleString()}
  </text>
)

export default TextSVG