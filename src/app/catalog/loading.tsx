import { Loader2 } from "lucide-react"


const Loading = () => {
  return (
     <div className="flex items-center justify-center h-full">
      <Loader2 className="h-7 w-7 animate-spin text-primary"/>
     </div>
 )
}

export default Loading