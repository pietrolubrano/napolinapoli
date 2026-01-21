"use client"

import Image from "next/image"
import useEmblaCarousel from 'embla-carousel-react'
import {
    FaArrowCircleLeft,
    FaArrowCircleRight
} from "react-icons/fa";
import Thumb from "./ThumbsButton";
import { useCallback, useEffect, useState } from "react";

export default function Carousel({
    images,
} : {
    images?: string[]
}) {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true })
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const onThumbClick = useCallback(
        (index: number) => {
        if (!emblaApi || !emblaThumbsApi) return
        emblaApi.scrollTo(index)
        },
        [emblaApi, emblaThumbsApi]
    )
    
      const onSelect = useCallback(() => {
        if (!emblaApi || !emblaThumbsApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap())
    }, [emblaApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaApi) return
       /*  onSelect() */

        emblaApi.on('select', onSelect).on('reInit', onSelect)
    }, [emblaApi, onSelect])
  /* const goToPrev = () => emblaApi?.scrollPrev()
  const goToNext = () => emblaApi?.scrollNext() */

  return (
    <div className="embla from-background bg-linear-to-b">
      <div className="embla__viewport" ref={emblaRef}>
        
        <div className="embla__container">
            {images?.map((image, index) => (
                <div className="embla__slide flex w-full justify-center" key={index}>
                    <Image src={image} width={1920} height={1080} alt={`Slide ${index + 1}`} className="w-auto max-h-[calc(100vh-150px)] h-auto"/>
                </div>
            ))}
        </div>

        <div className="embla-thumbs">
            <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                <div className="embla-thumbs__container flex justify-center pb-4">
                    {images?.map((image, index) => (
                    <Thumb
                        key={index}
                        onClick={() => onThumbClick(index)}
                        selected={index === selectedIndex}
                        index={index}
                        image={image}
                    />
                    ))}
                </div>
            </div>
        </div>
      
      </div>

      {/* <button className="embla__prev" onClick={goToPrev}>
        <FaArrowCircleLeft size={'2em'} />
      </button>
      <button className="embla__next" onClick={goToNext}>
        <FaArrowCircleRight size={'2em'} />
      </button> */}

    </div>
  )
}