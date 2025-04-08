import {Product} from "@prisma/client"
import "../globals.css"
import {ProductCard} from "@/components/ProductCard"
import AdminLink from "./AdminLink"
import {getAllProducts} from "../../api/server/products" // 예시로 전부 가져오는 함수 사용

export default async function Homepage() {
  const products: Product[] = await getAllProducts()

  return (
    <main className="space-y-12 max-w-7xl mx-auto p-6">
      <AdminLink />

      <section className="p-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 text-white text-center shadow-xl">
        <h1 className="text-4xl font-bold mb-4">곤약젤리</h1>
        <p className="text-lg mb-8">3000원 + 택배비4000원(조건무료)</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </main>
  )
}
