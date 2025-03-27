import {gowoon, inter} from "./font";
import "./globals.css";

export default function Home() {
  return (
    <div className="container">
      {/*<div className={inter.className}>부산 국제시장</div>*/}
      <div className={gowoon.className} style={{fontSize: "2em"}}>
        부산 깡통시장 택배대행
      </div>
      <div
        className={inter.className}
        style={{fontSize: "1.4em", color: "gray"}}
      >
        기본 택배비 3000 + 구매대행수수료(1000원: 아이템5개)
      </div>
      <div>아이템 5개 이상 문의요망</div>
      <br />
      <div className="linkContainer">
        <a
          href="/items/wisky"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
          style={{"background-color": "black"}}
        >
          {" "}
          📱 문자문의 : 010.9876.1815
        </a>

        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
      </div>

      <div className="linkContainer pt-2">
        {" "}
        <a
          href="https://www.youtube.com/@canmartkorea"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
          style={{"background-color": "#c10002"}}
        >
          youtube.com@icanmartkorea
        </a>
      </div>
      <div>
        등록되어 있는 아이템및 깡통시장에 있는 제품은 모두 택배 가능합니다.
      </div>
    </div>
  );
}
