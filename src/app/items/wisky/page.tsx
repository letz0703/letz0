import Image from "next/image";
import "./style.css"; // 이미지 스타일 불러오기
import Link from "next/link"

export default function Page() {
  return (
    <div className="divOverlay"
    >
      {/* 4K 이미지 */}
      <Image
        src="/images/ballan.jpg" // public 폴더 내 이미지 경로
        alt="cover page"
				width={3840}
				height ={2160}
        className="image4K"
      />

      {/* 오버레이 텍스트 */}
      {/*<div className="overlayText"
      >

      </div>*/}
			<Link
      href="https://www.youtube.com/playlist?list=PLxJmwr-75ybaA0OypwGjCQSLKbyXHK5zg"
      target="_blank"
      className="px-4 py-2 bg-yellow-400 text-black rounded-lg shadow-md hover:bg-yellow-500 transition"
    >
      깡통시장 최신가격 - YOUTUBE
    </Link>
    </div>
  );
}
