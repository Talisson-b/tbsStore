import { ArrowLeftIcon, ArrowRightIcon, ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/provider/cart"
import CartItem from "./cart-item"
import { computeProductTotalPrice } from "@/helpers/product"
import { Button } from "./button"


const Cart = () => {
  const { products } = useContext(CartContext)
  return (
    <div className="flex flex-col gap-5">
       <Badge className="gap-1 w-fit text-base uppercase border-primary border-2 px-3 py-[0.375rem]" variant="outline">
        <ShoppingCartIcon size={16}/>
        Carrinho
      </Badge>
     <div className="flex flex-col gap-5">
      {products.map((product) => (
          <CartItem key={product.id} product={computeProductTotalPrice(product as any) as any}/>
        ))}
     </div>
    </div>
  )
}

export default Cart