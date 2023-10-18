import { Category } from "@prisma/client"
import Image from 'next/image'
interface CategoryItemProps {
  category: Category
}


const CategoryItem = ({category}: CategoryItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="bg-category-item-gradient w-full h-[150px] flex items-center justify-center rounded-tl-lg rounded-tr-lg ">
        <Image src={category.imageUrl}  alt={category.name} width={140} height={140} sizes="100vw" className="h-auto max-h-[70%] w-auto max-w-[80%]" style={{
          objectFit: "contain"
        }}/>
      </div>
      <div className="bg-accent py-2 rounded-br-lg rounded-bl-lg">
        <p className="text-sm font-semibold text-center">{category.name}</p>
      </div>
    </div>
  )
}

export default CategoryItem