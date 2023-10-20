'use client'

import Image from "next/image"
import { useState } from "react"

interface ProductImagesUrlsProps {
  name: string
  imageUrls: string[]
}

const ProductImage = ({imageUrls, name}:ProductImagesUrlsProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0])

  function handleImageClick(imageUrl: string) {
    setCurrentImage(imageUrl)
  }
  
  return (
    <div className="flex flex-col">
      <div className="bg-accent h-[380px] w-full flex items-center justify-center ">
        <Image 
        src={currentImage} 
        alt={name}  
        height={0} 
        width={0} 
        sizes="100vw" 
        className="h-auto max-h-[70%] w-auto max-w-[80%]" 
        style={{
          objectFit: 'contain'
        }}/>
    </div>
  {/* BOTÕES COM AS OUTRAS IMAGENS */}
     <div className="grid grid-cols-4 gap-4 mt-8 px-5">
      {imageUrls.map((imageUrl) => (
            <button 
              key={imageUrl} 
              onClick={() => handleImageClick(imageUrl)}

              className={`"bg-accent rounded-lg flex justify-center items-center h-[100px]"
                ${imageUrl === currentImage && 'border-2 border-solid border-primary bg-accent rounded-lg flex justify-center items-center h-[100px]'}
            `}>
              <Image 
                src={imageUrl}
                alt={name}
                height={0}
                width={0}
                sizes="100vw"
                className="h-auto max-h-[70%] w-auto max-w-[80%]"
              />
            </button>
          ))}
     </div>
    </div>
  )
}

export default ProductImage