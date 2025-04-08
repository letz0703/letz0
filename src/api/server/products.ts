import db from "@/db/db"

export function getNewestProducts() {
  return db.product.findMany({
    orderBy: {orders: {_count: "desc"}},
    take: 6
  })
}

export function getMostPopularProducts() {
  return db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: {orders: {_count: "desc"}},
    take: 6
  })
}
export function getAllProducts() {
  return db.product.findMany({
    where: {isAvailableForPurchase: true}, // 판매 중인 상품만
    orderBy: {createdAt: "desc"} // 최근 등록 순 정렬 (선택사항)
  })
}
