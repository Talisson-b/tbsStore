import { prismaClient } from "@/lib/prisma"
import ProductImage from "./components/product-image"
import ProductInfo from "./components/product-info"
import { computeProductTotalPrice } from "@/helpers/product"
import ProductList from "@/components/ui/product-list"


interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

const ProductDetailsPage = async ({params: {slug}}: ProductDetailPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug
    },
    include: {
      category: {
        include: {
          Product: {
            where: {
              slug: {
                not: slug
              }
            }
          }
        }
      }
    }
  })

  if(!product) {
    return null
  }
  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImage key={product.id} imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={computeProductTotalPrice(product)}/>
      <ProductList products={product.category.Product}/>
    </div>
  )
}

export default ProductDetailsPage