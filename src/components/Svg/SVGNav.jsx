import dioLogo from "../../imgs/dio.svg"
import githubLogo from "../../imgs/github.png"
import linkedinLogo from "../../imgs/linkedin.svg"

const ICON_HEIGHT = '20px'

const SVGNav = () => (
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
)

export default SVGNav