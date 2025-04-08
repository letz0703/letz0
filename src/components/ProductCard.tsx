import {formatCurrency} from "@/lib/formatters"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card"
import {Button} from "./ui/button"
import Link from "next/link"
import Image from "next/image"

type ProductCardProps = {
  id: string
  name: string
  priceInCents: number
  description: string
  imagePath: string
}

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath
}: ProductCardProps) {
  return (
    <Card className="flex flex-col w-44 h-[370px] overflow-hidden">
      {/* 이미지 영역 */}
      <div className="relative w-full aspect-[4/5] bg-white p-2">
        <Image src={imagePath} fill alt={name} className="object-contain" />
      </div>
      {/* 제목 + 가격 */}
      <CardHeader className="py-2 px-4">
        <CardTitle className="text-sm">{name}</CardTitle>
        {/*<CardDescription className="text-xs text-blue-700 font-semibold">*/}
        {/*{`${priceInCents.toLocaleString("ko-KR")}원`}*/}
        {/*</CardDescription>*/}
      </CardHeader>
      {/*<CardContent className="flex-grow px-4">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>*/}
      {/*</CardContent>*/}
      {/* 구매 버튼 */}
      <CardFooter className="px-4 pb-4 mt-auto">
        <Button asChild size="lg" className="w-full text-xs">
          <Link href={`/products/${id}/purchase`}>구매하기</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
