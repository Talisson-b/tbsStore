import { prismaClient } from "@/lib/prisma"
import ProductImage from "./components/product-image"

interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

const ProductDetailsPage = async ({params: {slug}}: ProductDetailPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug
    }
  })

  if(!product) {
    return null
  }
  return (
    <div >
      <ProductImage key={product.id} imageUrls={product.imageUrls} name={product.name} />
    </div>
  )
}

export default ProductDetailsPage