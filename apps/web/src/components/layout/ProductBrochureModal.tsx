"use client"

import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ProductBrochureModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProductBrochureModal({ isOpen, onClose }: ProductBrochureModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const brochures = [
    {
      id: 1,
      title: "Hand-Rolled Products",
      image: "/hand-rolled.jpg",
      filename: "Sandhya-Foods-Hand-Rolled.jpg"
    },
    {
      id: 2,
      title: "Machine-Rolled Products",
      image: "/machine-rolled.jpg",
      filename: "Sandhya-Foods-Machine-Rolled.jpg"
    }
  ]

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Reset to first image when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0)
    }
  }, [isOpen])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % brochures.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + brochures.length) % brochures.length)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  if (!isOpen) return null

  const currentBrochure = brochures[currentIndex]

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Close brochure"
          >
            <X className="w-5 h-5 text-gray-800" />
          </button>

          {/* Header */}
          <div className="bg-[#7A1A14] text-white px-6 py-4">
            <h2 className="font-royal text-xl sm:text-2xl tracking-wide text-[#D4AF37]">
              {currentBrochure.title}
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Browse our product catalog with prices ({currentIndex + 1} of {brochures.length})
            </p>
          </div>

          {/* Brochure Image with Navigation */}
          <div 
            className="overflow-y-auto max-h-[calc(90vh-180px)] bg-gray-50 relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Previous brochure"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Next brochure"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Image */}
            <div className="relative w-full">
              <Image
                src={currentBrochure.image}
                alt={currentBrochure.title}
                width={1200}
                height={1600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Footer with Indicators and Download */}
          <div className="bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center">
            {/* Page Indicators */}
            <div className="flex gap-2">
              {brochures.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-[#7A1A14] w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to brochure ${index + 1}`}
                />
              ))}
            </div>

            {/* Download Button */}
            <a
              href={currentBrochure.image}
              download={currentBrochure.filename}
              className="px-5 py-2.5 rounded-full bg-[#7A1A14] text-white text-sm font-semibold hover:bg-[#5A0F0A] transition-colors duration-200 shadow-md"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </>
  )
}