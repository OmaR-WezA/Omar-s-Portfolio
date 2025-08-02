import { useEffect, useState } from "react"

const AutoImageSlider = () => {
  const images = [
    "/img/WezaProduction/1.png",
    "/img/WezaProduction/2.png",
    "/img/WezaProduction/3.png",
    "/img/WezaProduction/4.png",
    "/img/WezaProduction/5.png",
    "/img/WezaProduction/6.png",
    "/img/WezaProduction/7.png",
    "/img/WezaProduction/8.png",
  ]

  const [current, setCurrent] = useState(0)

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full max-w-xl h-64 sm:h-72 md:h-80 lg:h-96 mx-auto rounded-2xl overflow-hidden border border-white/20 shadow-lg">
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* Desktop-only navigation buttons */}
      <div className="hidden md:block">
        <button
          onClick={() =>
            setCurrent((prev) => (prev - 1 + images.length) % images.length)
          }
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
        >
          &#10094;
        </button>

        <button
          onClick={() =>
            setCurrent((prev) => (prev + 1) % images.length)
          }
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
        >
          &#10095;
        </button>
      </div>
    </div>
  )
}

export default AutoImageSlider
