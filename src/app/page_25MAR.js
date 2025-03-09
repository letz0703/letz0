import {gowoon, inter} from "./font";
import "./globals.css";

export default function Home() {
  return (
    <div className="container">
      {/*<div className={inter.className}>부산 국제시장</div>*/}
      <div className={gowoon.className} style={{fontSize:"2em"}}>부산 국제시장</div>
      <div className={inter.className} style={{fontSize:"1.4em", color:"gray"}}>Gukje Market, BUSAN KOREA</div>
      <br/>
      <div className="linkContainer">
        <a
          href="/items/wisky"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
          style={{"background-color":"black"}}
        > 🥃  051.246.0909
        </a>
        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
      </div>
      <div className="linkContainer pt-2">
        <a
          href="/items"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
        >🔎 search items
        </a>
        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
      </div>
      <div className="linkContainer pt-2">
        <a
          href="https://www.youtube.com/playlist?list=PLxJmwr-75ybaA0OypwGjCQSLKbyXHK5zg"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
          style={{"background-color":"#c10002"}}
        >youtube @icanmart051
        </a>
      </div>
      <div className="linkContainer pt-2">
        <a
          href="https://kr.pinterest.com/canmartkorea/"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
          style={{"background-color":"green"}}
        > pinterest Item gallery
        </a>
      </div>

      <div>
        ✉️ icanmart@gmail.com
      </div>
      <div>
        010.9876.1815 / text only
      </div>
    </div>
  );
}
