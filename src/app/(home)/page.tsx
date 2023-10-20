import Categories from "./components/categories"
import { prismaClient } from "@/lib/prisma"
import ProductList from "../../components/ui/product-list"
import PromoBanner from "./components/promo-banner"
import SectionTitle from "../../components/ui/section-title"
import Link from "next/link"

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      }
    }
  })

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards"
      }
    }
  })

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses"
      }
    }
  })
  return (
    <div className="flex flex-col gap-8 py-8">
      <PromoBanner src='/banner-home-01.png' alt='até 55% de desconto esse mês'/>
      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div>
       <Link href='/deals'>
       <SectionTitle>Ofertas</SectionTitle>
       </Link>
        <ProductList products={deals}/>
      </div>

     <Link href='/category/mouses'>
        <PromoBanner src="/banner-home-02.png" alt="até 55% de desconto em mouses" />
     </Link>
      <div>
        <Link href="category/keyboards">
          <SectionTitle>Teclados</SectionTitle>
        </Link>
        <ProductList products={keyboards}/>
      </div>

      
      <div>
        <Link href="/category/headphones">
          <PromoBanner src="/banner-home-03.png" alt="até 20% de desconto em fones" /> 
        </Link>
      </div>

      <div>
        <Link href="category/mouses">
          <SectionTitle>Mouses</SectionTitle>
        </Link>
        <ProductList products={mouses}/>
      </div>
    </div>
  )
}
