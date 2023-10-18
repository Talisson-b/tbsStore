import { ProductWithTotal } from "@/helpers/product"
import Image from "next/image"
import { Badge } from "./badge"
import { ArrowDownIcon } from "lucide-react"

interface ProductItemProps {
  product: ProductWithTotal
}

const ProductItem = ({product}: ProductItemProps) => {
  return (
    <div className="flex flex-col gap-4 ">
      <div className=" relative bg-accent rounded-lg h-[170px] w-full flex items-center justify-center">
        <Image src={product.imageUrls[0]} width={0} height={0} sizes="100vw" className="h-äuto w-auto max-w-[80%] max-h-[70%]" style={{
          objectFit:"contain"
        }} alt={product.name}/>

      {product.discountPercentage > 0 && (
        <Badge className="absolute left-3 top-3 px-2 py-[2px]">
          <ArrowDownIcon size={14}/>
          {product.discountPercentage}%
        </Badge>
      )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          {product.discountPercentage > 0 ? (
            <>
              <p className="font-semibold text-ellipsis">R$ {(product.totalPrice).toFixed(2)}</p>

              <p className="opacity-75 line-through text-xs text-ellipsis">R$ {Number(product.basePrice).toFixed(2)}</p>
            </>
          ): (
            <p className="font-semibold text-sm">R$ {(product.basePrice).toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductItem