import Image from "next/image"
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
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
      setIsLoading(true)
    }, 4000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full max-w-xl h-64 sm:h-72 md:h-80 lg:h-96 mx-auto rounded-2xl overflow-hidden border border-primary/20 shadow-2xl bg-muted/20 backdrop-blur-sm group">
      {mounted && (
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: 1 }}
        />
      )}

      {/* Simple overlay shadow for better text contrast if needed */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i)
              // Removed setIsLoading(true) as isLoading state is removed
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${current === i ? "bg-primary w-6" : "bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>

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
