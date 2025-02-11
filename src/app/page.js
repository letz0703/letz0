import {gowoon, inter} from "./font";
import "./globals.css";

export default function Home() {
  return (
    <div className="container">
      {/*<div className={inter.className}>부산 깡통시장 가격정보</div>*/}
      <div className={gowoon.className} style={{fontSize:"2em"}}>부산 깡통시장 가격정보</div>
      <div className={inter.className} style={{fontSize:"1.4em", color:"gray"}}>🏷️ price info - CANMART, KOREA</div>
      <br/>
      <div className="linkContainer">
        <a
          href="/items/wisky"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
        > 🥃 위스키 가격문의 : 051.246.0909
        </a>
        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
      </div>
      <div className="linkContainer pt-2">
        <a
          href="/items"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
        >🔎 수입제품 가격검색
        </a>
        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
      </div>
      <div className="linkContainer pt-2">
        <a
          href="https://www.youtube.com/playlist?list=PLxJmwr-75ybaA0OypwGjCQSLKbyXHK5zg"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
          style={{"background-color":"#c10002"}}
        >youtube
        </a>
        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
      </div>
      <div>조니워커 블루 2025 뱀띠 : 44만원</div>
      <div>블루망디(금색) : 54만원 </div>
      <div className="bg-red-700 px-2 text-white
      ">25년2월10일현재가</div><div>가격변경이 있을 수 있으므로 주문시 가격 재문의 바랍니다</div>
      <div>
        icanmart@gmail.com
      </div>
    </div>
  );
}
