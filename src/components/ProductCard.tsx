import {formatCurrency} from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import {Button} from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath
}: ProductCardProps) {
  return (
    <Card className="flex flex-col w-44 h-[350px] overflow-hidden">
      <div className="relative w-full aspect-[4/5] bg-white p-2">
        <Image src={imagePath} fill alt={name} className="object-contain" />
      </div>

      <CardHeader className="py-2 px-4">
        <CardTitle className="text-sm">{name}</CardTitle>
        <CardDescription className="text-xs">
          {formatCurrency(priceInCents / 100)}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow overflow-hidden px-4">
        <p className="text-xs line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter className="px-4 pb-4 mt-auto">
        <Button asChild size="lg" className="w-full text-xs">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
