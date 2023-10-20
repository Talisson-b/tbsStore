import {ShoppingCartIcon } from "lucide-react"
import { Badge } from "./badge"
import { useContext } from "react"
import { CartContext } from "@/provider/cart"
import CartItem from "./cart-item"
import { computeProductTotalPrice } from "@/helpers/product"
import { Separator } from "./separator"
import { ScrollArea } from "./scroll-area"
import { Button } from "./button"
import { createCheckout } from "@/actions/checkout"
import { loadStripe } from '@stripe/stripe-js'


const Cart = () => {
  const { products, subTotal, total, totalDiscount } = useContext(CartContext)

  async function handleFinishPurchaseClick() {
    const checkout = await createCheckout(products)

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
    )

    stripe?.redirectToCheckout({
      sessionId: checkout.id
    })
  }

  return (
    <div className="flex flex-col gap-5 h-full">
       <div className=" rounded-b-[50px] flex flex-col gap-3 h-full overflow-hidden bg-primary/40" >
       <Badge className="gap-1 w-fit text-base uppercase border-primary  bg-accent border-2 px-3 py-[0.375rem] m-3">
        <ShoppingCartIcon size={16}/>
        Carrinho
      </Badge>
     <div className="flex flex-col gap-5 h-full overflow-hidden p-3">
        <ScrollArea className="h-full">
         <div className="flex flex-col gap-8">
         {products.length > 0 ? (
          products.map((product) => (
              <CartItem key={product.id} product={computeProductTotalPrice(product as any) as any}/>
          ))
          ): (
          <p className="text-center font-semibold">Carinho vazio.</p>
          )}
         </div>
        </ScrollArea>
     </div>
       </div>

    {products.length > 0 && (
       <div className="flex flex-col gap-3 p-3">
       <Separator />

       <div className="flex items-center justify-between text-xs">
         <p>Subtotal</p>
         <p>R$ {subTotal.toFixed(2)}</p>
       </div>
       <Separator />
       
       <div className="flex items-center justify-between text-xs">
         <p>Entrega</p>
         <p>GRÁTIS</p>
       </div>

       <Separator />
       <div className="flex items-center justify-between text-xs">
         <p>Descontos</p>
         <p>- R$ {totalDiscount.toFixed(2)}</p>
       </div>

       <Separator />
       <div className="flex items-center justify-between text-sm font-bold">
         <p>Total</p>
         <p>R$ {total.toFixed(2)}</p>
       </div>
       <Button className="uppercase font-bold mt-7" onClick={handleFinishPurchaseClick}>Finaliza compra</Button>
    </div>
    )}
    </div>
  )
}

export default Cart