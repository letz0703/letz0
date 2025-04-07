import {ProductCard, ProductCardSkeleton} from "@/components/ProductCard"
import db from "@/db/db"
import {cache} from "@/lib/cache"
import {Suspense} from "react"

//function getProducts() {
//  // https://youtu.be/iqrgggs0Qk0?t=7405
//  return db.product.findMany({
//    where: {
//      isAvailableForPurchase: true
//    },
//    orderBy: {name: "asc"}
//  })
//}

const getProducts = cache(() => {
  return db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: {name: "asc"}
  })
}, ["/products", "getProducts"])

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductSuspense />
        {/*{(await productFetcher()).map(product => (
				<ProductCardSkeleton key={product.id} {...product} />
			))}*/}
      </Suspense>
      {/*{products.map(row => (
			//<ProductCard key={row.id} {...row} />
			<ProductSuspense productFetcher={productFetcher} />
		))}*/}
    </div>
  )
}
async function ProductSuspense() {
  const products = await getProducts()
  return products.map(row => <ProductCard key={row.id} {...row} />)
}
