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
