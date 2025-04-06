import db from "@/db/db";
import {gowoon, inter} from "../font";
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
    <div className="container ">
      <div className={gowoon.className} style={{fontSize: "2em"}}>
        곤약젤리 공동구매
      </div>
      <div
        className={inter.className}
        style={{fontSize: "1.4em", color: "gray"}}
      >
        개당 3000원
      </div>
      <div className="linkContainer pt-2">
        <a
          href="/09"
          className="linkButton"
          rel="noopener noreferrer"
          target="_blank"
        >
          택배비: 0원 - 조건별
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
