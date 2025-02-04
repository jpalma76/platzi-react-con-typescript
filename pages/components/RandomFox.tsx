import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

type LazyImageProps = { src: string };

type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNative

export const LazyImage = ({ src, ...ImgProps }: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null)

  const [currentSrc, setCurrentSrc] = useState(
     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  )

  useEffect(() => {
    // nuevo observador
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // onItersection -> console.log

        if (entry.isIntersecting) {
          setCurrentSrc(src)
        }
      })
    })

    // observe.node
    if(node.current) {
      observer.observe(node.current)
    }
    
    // desconectar
    return () => {
      observer.disconnect()
    }
  },[src])

  return (
    <img 
      ref={node} 
      src={currentSrc} 
      {...ImgProps}
    />)
}
