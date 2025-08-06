import {gowoon, inter} from "./font";
import "./globals.css";

export default function Home() {
  return (
    <div className="container">
      {/*<div className={inter.className}>부산 국제시장</div>*/}
      <div className={gowoon.className} style={{fontSize: "2em"}}>
        PRICE INFO
      </div>
      <div
        className={inter.className}
        style={{fontSize: "1.4em", color: "gray"}}
      ></div>
      <br />
      <div className="linkContainer">
        <a
          href="https://arc.net/e/BBB56A94-2D39-449A-A29A-067B1EE421F4"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
          style={{"background-color": "black"}}
        >
          Cigarette
        </a>

        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
      </div>

      <div className="linkContainer pt-2">
        <a
          href="https://www.youtube.com/channel/UCmqHe_syKZ6AxBiMK8wbJXg"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
          style={{"background-color": "#c10002"}}
        >
          youtube
        </a>
      </div>
      <div className="p-7"> leave a message to any clip</div>
    </div>
  );
}
