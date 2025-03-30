import db from "@/db/db";
import {gowoon, inter} from "./font";
import "./globals.css";
import {Product} from "@prisma/client";

function getMostPopularProducts() {
  return db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: {orders: {_count: "desc"}},
    take: 6
  });
}
function getNewestProducts() {
  return db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: {createdAt: "desc"},
    take: 6
  });
}

export default async function Home() {
  const popularProduct = await getMostPopularProducts();
  const newestProducts = await getNewestProducts();
  return (
    <div className="container">
      <div className={gowoon.className} style={{fontSize: "2em"}}>
        곤약젤리
      </div>
      <div
        className={inter.className}
        style={{fontSize: "1.4em", color: "gray"}}
      >
        개당 3000 + 택배비 4000원(공동구매시 무료)
      </div>
      <div>
        다른 상품들도 함께 배송해 드립니다 → youtube.com@icanmartkorea 참고
      </div>
      <div className="linkContainer pt-2">
        <a
          href="/09"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
        >
          해외공동구매 안내
        </a>
      </div>
      <br />
      <div className="linkContainer">
        <a
          href="/items/wisky"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
        >
          📱 문자문의 : 010.9876.1815
        </a>

        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
      </div>
      <div>
        등록되어 있는 아이템및 깡통시장에 있는 제품은 모두 택배 가능합니다.
      </div>
      <br />
      <ProductGridSection title="Popular" products={popularProduct} />
      <ProductGridSection title="New" products={newestProducts} />{" "}
    </div>
  );
}
type ProductGridSectionProps = {
  title: string;
  products: Product[];
};
function ProductGridSection({products, title}: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="text-3xl font-bold">{title}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {products?.map(product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
}
