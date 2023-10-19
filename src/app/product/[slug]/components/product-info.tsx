'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductWithTotal } from "@/helpers/product"
import { CartContext } from "@/provider/cart"
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react"
import { useContext, useState } from "react"


interface ProductInfoProps {
   product: ProductWithTotal
}
const ProductInfo = ({product}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1)
  const {addProductToCart} = useContext(CartContext)

  function handleAddToCartClick() {
    addProductToCart({...product, quantity})
  }

  function handleDecreaseQuantityClick() {
    setQuantity((state) => (state === 1 ? state : state - 1))
  }

  function handleIncreaseQuantityClick() {
    setQuantity((state) => state + 1)
  }

  return (
    <div className="flex flex-col px-5">
        <h2 className="text-lg">{product.name}</h2>

        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">R$ {product.totalPrice.toFixed(2)}</h1>
          
            {product.discountPercentage > 0 && (
            <Badge className="px-2 py-[2px]">
              <ArrowDownIcon size={14}/>
              {product.discountPercentage}%
            </Badge>
            )}
        </div>
            {product.discountPercentage > 0 && (
              <p className="text-xs opacity-75 line-through">De: R$ {Number(product.basePrice).toFixed(2)}</p>
            )}

        <div className="flex items-center gap-2 mt-4">
            <Button size="icon" variant="outline" onClick={handleDecreaseQuantityClick}>
              <ArrowLeftIcon size={16} />
            </Button>
              <span>{quantity}</span>
            <Button size="icon" variant="outline" onClick={handleIncreaseQuantityClick}>
              <ArrowRightIcon size={16} />
            </Button>
        </div>

        <div className="flex flex-col gap-3 mt-8">
            <h3 className="font-bold">Descrição</h3>
            <p className="text-sm opacity-60 text-justify">{product.description}</p>
        </div>
        <Button onClick={handleAddToCartClick} className="mt-8 uppercase font-bold">Adicionar ao carrinho</Button>
        <div className="bg-accent flex items-center px-5 py-2 justify-between mt-5 rounded-lg ">
            <div className="flex items-center gap-2">
              <TruckIcon />

              <div className="flex flex-col">
                <p className="text-xs">Entrega via <span className="font-bold">TBPacket&reg;</span></p>
                <p className="text-[#8162ff] text-xs">Envio para <span className="font-bold">todo Brasil</span></p>
              </div>
            </div>
            <p className="font-bold text-xs">Frete grátis</p>
        </div>
    </div>
  )
}

export default ProductInfo