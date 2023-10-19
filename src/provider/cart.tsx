'use client'

import { ProductWithTotal } from "@/helpers/product";
import { createContext, useState } from 'react'

export interface CartProduct extends ProductWithTotal {
  quantity: number
}

interface ICartContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
  addProductToCart: (product: CartProduct) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0,
  addProductToCart: () => {}
})



const CartProvider = ({children}) => {
  const [products, setProducts] = useState<CartProduct[]>([])


  function addProductToCart(product: CartProduct) {
      // se o produto já estiver no carrinho, apenas aumeta a sua quantidade
  const productIsAlreadyOnCart = products.some((cartProduct) => cartProduct.id === product.id)

  if(productIsAlreadyOnCart) {
    setProducts((state) => 
      state.map((cartProduct) => {
        if(cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + product.quantity
          }
        }
        return cartProduct
      })
    )
    return
  }

  // se não, adiciona o produto no carrinho
    setProducts((state) => [...state, product])
  }
  return (
    <CartContext.Provider value={{
      cartBasePrice: 0,
      cartTotalDiscount: 0,
      cartTotalPrice: 0,
      products,
      addProductToCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider