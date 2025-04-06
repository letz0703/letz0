import db from "@/db/db"
import {orderBy} from "firebase/firestore"
import {gowoon, inter} from "../font"
import "../globals.css"
import {Product} from "@prisma/client"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {ArrowRight} from "lucide-react"
import {ProductCard, ProductCardSkeleton} from "@/components/ProductCard"
import AdminLink from "./AdminLink"
import {Suspense} from "react"

function getNewestProducts() {
  return db.product.findMany({orderBy: {orders: {_count: "desc"}}, take: 6})
}
function getMostPopularProducts() {
  return db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: {orders: {_count: "desc"}},
    take: 6
  })
}

export default function Homepage() {
  return (
    <main className="space-y-12">
      <AdminLink />
      <ProductGridSection
        title="Most Popular"
        productFetcher={getMostPopularProducts}
        //productFetcher={function (): Promise<Product[]> {
        //  throw new Error("Function not implemented.");
        //}}
      />
      <ProductGridSection
        title="Neweset"
        productFetcher={getNewestProducts}
        //productFetcher={function (): Promise<Product[]> {
        //  throw new Error("Function not implemented.");
        //}}
      />
    </main>
  )
}
type ProductGridSectionProps = {
  title: string
  productFetcher: () => Promise<Product[]>
}

function ProductGridSection({productFetcher, title}: ProductGridSectionProps) {
  const products = productFetcher()
  return (
    <div className="space-4">
      <div className="flex gap4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productFetcher={productFetcher} />
          {/*{(await productFetcher()).map(product => (
            <ProductCardSkeleton key={product.id} {...product} />
          ))}*/}
        </Suspense>
        {/*{products.map(row => (
          //<ProductCard key={row.id} {...row} />
          <ProductSuspense productFetcher={productFetcher} />
        ))}*/}
      </div>
    </div>
  )
}
async function ProductSuspense({
  productFetcher
}: {
  productFetcher: () => Promise<Product[]>
}) {
  return (await productFetcher()).map(row => (
    <ProductCard key={row.id} {...row} />
  ))
}

//import Link from "next/link";
//import {Button} from "@/components/ui/button";
//import {ArrowRight} from "lucide-react";
//import {ProductCard} from "@/components/ProductCard";

//export default async function HomePage() {
//  const popularProduct = await getMostPopularProducts();
//  const newestProducts = await getNewestProducts();
//  return (
//    <div className="container ">
//      <div className={gowoon.className} style={{fontSize: "2em"}}>
//        곤약젤리 공동구매
//      </div>
//      <div
//        className={inter.className}
//        style={{fontSize: "1.4em", color: "gray"}}
//      >
//        개당 3000원
//      </div>
//      <div className="linkContainer pt-2">
//        <a
//          href="/09"
//          className="linkButton"
//          rel="noopener noreferrer"
//          target="_blank"
//        >
//          택배비: 0원 - 조건별
//        </a>
//      </div>
//      <br />
//      <div className="linkContainer">
//        <a
//          href="/items/wisky"
//          className="linkButton"
//          rel="noopener noreferrer"
//          target="_blank"
//        >
//          📱 문자문의 : 010.9876.1815
//        </a>

//        {/*<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="rainskiss" data-description="Support me on Buy me a coffee!" data-message="" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18"></script>*/}
//      </div>
//      <br />
//      <ProductGridSection
//        title="Most Popular"
//        productFetcher={getMostPopularProducts}
//        products={[]}
//      />
//      <ProductGridSection
//        title="Newest"
//        productFetcher={getNewestProducts}
//        products={[]}
//      />{" "}
//    </div>
//  );
//}
//type ProductGridSectionProps = {
//  title: string;
//  products: Product[];

//  productFetcher: () => Promise<Product[]>;
//};
//async function ProductGridSection({productFetcher, title}: ProductGridSectionProps) {
//  return (
//    <div className="space-y-4">
//      <div className="flex gap-4">
//        <h2 className="text-3xl font-bold">{title}</h2>
//        <Button className="mt-4" size="lg" asChild>
//          <Link href="/products" className="space-x-2">
//            View All <ArrowRight className="size-4"></ArrowRight>
//          </Link>
//        </Button>
//      </div>
//      <div className="grid grid-cols-2 gap-4">
//        {(await productFetcher).map(product => (
//          <ProductCard
//            key={product.id}
//            id={product.id}
//            name={product.name}
//            priceInCents={product.priceInCents}
//            description={product.description}
//            imagePath={product.imagePath}
//          />
//        ))}
//      </div>
//      </div>
//    </div>
//  );
//}

//https://youtu.be/iqrgggs0Qk0?t=6958 2025.04.06 일 wds
//https://youtu.be/iqrgggs0Qk0?t=7202 Skeleton
