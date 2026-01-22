import Image from "next/image"

type PropType = {
  selected: boolean
  index: number
  image: string
  onClick: () => void
}

export const Thumb = (props: PropType) => {
  const { selected, index, image, onClick } = props

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number h-20! rounded-sm! overflow-hidden border-2! border-white hover:border-gray-500 opacity-50 hover:opacity-100"
      >
        <Image src={image} width={1920} height={1080} alt={`Slide ${index + 1}`} className="w-full h-auto"/>
      </button>
    </div>
  )
}
export default Thumb