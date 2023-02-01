import { TEXT_OFFSET } from "../../../utils/constants"

const TextSVG = ({x, y, content, anchor='start'}) => {
  let xOffset
  switch (anchor) {
    case 'start': 
      xOffset = TEXT_OFFSET
      break
    case 'end':
      xOffset = -TEXT_OFFSET
      break
    default:
      xOffset = 0
  }

  return (
    <text 
      x={x + xOffset}
      y={y + Math.sign(y)*TEXT_OFFSET}
      textAnchor={anchor}
      dominantBaseline={ y <= 0 ? 'alphabetic' : 'hanging'}
    >
      { typeof content === 'number' 
        ? content.toFixed(2).toLocaleString()
        : content
      }
    </text>
  )
}

export default TextSVG