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
  decreaseProductQuantity: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {}
})


const CartProvider = ({children}: any) => {
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

  function decreaseProductQuantity(productId: string) {
    // se a quantidade for 1 remove o produto
    // se nao diminui 1
    setProducts((state) => state.map((cartProduct) => {
      if(cartProduct.id === productId) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity - 1
        }    
      }
      return cartProduct
    }).filter((cartProduct) => cartProduct.quantity > 0)
    )
  }

  return (
    <CartContext.Provider value={{
      cartBasePrice: 0,
      cartTotalDiscount: 0,
      cartTotalPrice: 0,
      products,
      addProductToCart,
      decreaseProductQuantity
    }}>
      {children}
    </CartContext.Provider>
  )
}



export default CartProvider