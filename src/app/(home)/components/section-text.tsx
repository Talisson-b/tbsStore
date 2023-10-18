import {ComponentProps } from "react"


const SectionText = ({children, ...props}: ComponentProps<"p">) => {
  return (
    <p className="font-semibold uppercase pl-5 mb-3" {...props}>{children}</p>
   
  )
}

export default SectionText