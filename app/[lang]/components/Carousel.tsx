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
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
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
    <div className="embla w-fit max-h-screen overflow-hidden">
      <div className="embla__viewport" ref={emblaRef}>
        
        <div className="embla__container max-h-screen">
            {images?.map((image, index) => (
                <div className="embla__slide flex justify-center items-center" key={index}>
                    <Image src={image} width={1920} height={1080} alt={`Slide ${index + 1}`} className="bg-green-400 max-h-[calc(100svh-175px)] w-fit h-fit"/>
                </div>
            ))}
        </div>

        <div className="hidden embla-thumbs md:flex justify-center m-0!">
            <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                <div className="embla-thumbs__container flex justify-center p-4">
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