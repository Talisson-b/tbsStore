'use client'

import { ProductWithTotal } from "@/helpers/product";
import { createContext, useEffect, useMemo, useState } from 'react'

export interface CartProduct extends ProductWithTotal {
  quantity: number
}

interface ICartContext {
  products: CartProduct[]
  cartTotalPrice: number
  cartBasePrice: number
  cartTotalDiscount: number
  quantityProductsCart: number
  total: number,
  subTotal: number,
  totalDiscount: number,
  addProductToCart: (product: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProduct: (productId: string) => void

}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  cartTotalPrice: 0,
  quantityProductsCart: 0,
  total: 0,  
  subTotal: 0,
  totalDiscount:0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {}
})


const CartProvider = ({children}: any) => {
  const [products, setProducts] = useState<CartProduct[]>(
    JSON.parse(localStorage.getItem('@tbs-store/cart-products') || '[]')
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('@tbs-store/cart-products', JSON.stringify(products));
    }
  }, [products]);

  // Total sem desconto
  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity
    }, 0)
  }, [products])

  // Total com desconto
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.totalPrice * product.quantity
    }, 0)
  }, [products])

  // Total de descontos
  const totalDiscount = subTotal - total

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

  function increaseProductQuantity(productId: string) {
    setProducts((state) => state.map((cartProduct) => {
      if(cartProduct.id === productId) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity + 1
        }    
      }
      return cartProduct
    })
    )
  }

  function removeProduct(productId: string) {
    setProducts((state) => state.filter((cartProduct) => cartProduct.id !== productId))
  }



  return (
    <CartContext.Provider value={{
      cartBasePrice: 0,
      cartTotalDiscount: 0,
      cartTotalPrice: 0,
      products,
      addProductToCart,
      decreaseProductQuantity,
      increaseProductQuantity,
      removeProduct,
      quantityProductsCart: products.length,
      subTotal,
      total,
      totalDiscount
    }}>
      {children}
    </CartContext.Provider>
  )
}



export default CartProvider