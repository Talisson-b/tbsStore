import { Badge } from "@/components/ui/badge"
import { CATEGORY_ICON } from "@/contants/category-icon"
import { Category } from "@prisma/client"


interface CategoryImtemProps {
  category: Category
}

const CategoryItem = ({category}:CategoryImtemProps) => {

  return (
    <Badge variant="outline" className="py-3 flex justify-center items-center gap-2 rounded-lg">
      {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON ]}
      <span className="font-medium text-xs">{category.name}</span>
    </Badge>
  )
}

export default CategoryItem