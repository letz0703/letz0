import {gowoon, inter} from "./font";
import "./globals.css";

export default function Home() {
  return (
    <div className="container">
      {/*<div className={inter.className}>부산 깡통시장 가격정보</div>*/}
      <div className={gowoon.className} style={{fontSize:"2em"}}>부산 깡통시장 가격정보</div>
      <div className={inter.className} style={{fontSize:"1.4em", color:"gray"}}>price info - CANMART, KOREA</div>
      <br/>
      <div className="linkContainer">
        <a
          href="/items"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
        >🔎 PRICE INFO
        </a>
      </div>
    </div>
  );
}
