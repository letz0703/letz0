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
          href="/items/wisky"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
        > 🥃 Wisky
        </a>
        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
      </div>
      <div className="linkContainer">
        <a
          href="/items"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
        >🔎 PRICE INFO
        </a>
        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
      </div>
    </div>
  );
}
