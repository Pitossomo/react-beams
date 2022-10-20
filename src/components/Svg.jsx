import HighlightLine from "./Svg/HighlightLineSVG";
import SvgResults from "./Svg/SvgResults";
import dioLogo from "../imgs/dio.svg"
import githubLogo from "../imgs/github.png"
import linkedinLogo from "../imgs/linkedin.svg"


const Svg = ({svgRef, viewMode, beamParams, results, pointerCoordinates, updatePointerCoordinates}) => {
  const ICON_HEIGHT = '24px'
  return <>
    <svg id="drawing-area" xmlns="http://www.w3.org/2000/svg"
      ref={svgRef} viewBox={`${-1.5} ${-3} ${beamParams.length + 3} ${6}`}
      onMouseMove={updatePointerCoordinates}
    >      
      <defs>
        <g id="support-def-svg">
          <polygon points="-0.1,0.2 0.1,0.2 0,0.03" />
          <line x1="-0.1" x2="0.1" y1="0.25" y2="0.25" /> 
        </g>
        <pattern id="vertical-lines-pattern" width="0.1" height="0.1" viewBox="0 0 40 40" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
          <path d="M-10 30h60v1h-60zM-10-10h60v1h-60" fill="rgba(0, 0, 0, 1)"/>
        </pattern>
        <g id="up-reaction-force-svg" className="reaction-arrow up">
          <line x1="0" x2="0" y1="0.5" y2="1.0" />
          <polyline points="-0.05,0.7 0,0.5 0.05,0.7" />
        </g>
        <g id="down-reaction-force-svg" className="reaction-arrow down">
          <line x1="0" x2="0" y1="0.5" y2="1.0" />
          <polyline points="-0.05,0.8 0,1.0 0.05,0.8" />
        </g>
      </defs>
      <g id="svg-elements">
        <line x1="0" x2={beamParams.length} id="beam-svg" />
        <g id="supports-group-svg">
          { beamParams.supports.map(support => (
            <use key={support} href="#support-def-svg" x={support} />
          ))}
        </g>
        <SvgResults viewMode={viewMode} beamParams={beamParams} results={results} />
        <HighlightLine viewMode={viewMode} pointerCoordinates={pointerCoordinates} />
      </g>  
    </svg>
    <nav>
      { /*<span>Desenvolvido por @Pitossomo</span>*/ }
      <a href="https://www.linkedin.com/in/pedrocarvalhoeng/">
        <img height={ICON_HEIGHT}
          src={linkedinLogo}
        />
      </a>
      <a href="https://github.com/Pitossomo">
        <img height={ICON_HEIGHT} 
          src={githubLogo}
          />
      </a>
      {
      /*<a href="https://www.instagram.com/pitossomo/">
        <img height={ICON_HEIGHT}
          src="https://camo.githubusercontent.com/c9dacf0f25a1489fdbc6c0d2b41cda58b77fa210a13a886d6f99e027adfbd358/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f696e7374616772616d2e737667"
        />
      </a>*/
      }
      <a href="https://web.dio.me/users/pedro_h_teles?tab=achievements">
        <img height={ICON_HEIGHT}
          src={dioLogo}
          />
      </a>
    </nav>
  </>
}

export default Svg
