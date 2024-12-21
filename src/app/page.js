import "./globals.css";

export default function Home() {
  return (
    <div className="container">
      <div className="title">부산 깡통시장 가격정보</div>
      <div className="linkContainer">
        <a
          href="/items"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
        >
          PRICE INFO
        </a>
      </div>
    </div>
  );
}
