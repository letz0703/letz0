import {Product} from "@prisma/client"
import {gowoon, inter} from "../font"
import "../globals.css"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {ArrowRight} from "lucide-react"
import {ProductCard} from "@/components/ProductCard"
import AdminLink from "./AdminLink"
//import CheckoutWrapper from "@/components/CheckoutWrapper"
import {getMostPopularProducts, getNewestProducts} from "@/api/server/products"
import CheckoutWrapper from "../../../components/CheckoutWrapper"

export default async function Homepage() {
  const amount = 49.99
  const mostPopular = await getMostPopularProducts()
  const newest = await getNewestProducts()

  return (
    <main className="space-y-12 max-w-7xl mx-auto p-6">
      <AdminLink />

      <ProductGridSection title="Most Popular" products={mostPopular} />
      <ProductGridSection title="Newest" products={newest} />

      <section className="mt-12 p-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 text-white text-center shadow-xl">
        <h1 className="text-4xl font-bold mb-2">곤약젤리 결제</h1>
        <p className="text-xl mb-6">
          총 결제 금액: <span className="font-extrabold">${amount}</span>
        </p>

        <div className="max-w-md mx-auto">
          <CheckoutWrapper amount={amount} />
        </div>
      </section>
    </main>
  )
}

function ProductGridSection({
  title,
  products
}: {
  title: string
  products: Product[]
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>전체보기</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
