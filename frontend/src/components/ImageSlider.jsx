import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from './ui/button';

const ImageSlider = ({ images, interval = 2500, autoPlay = true }) => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [current, images.length, interval, isPlaying, isPaused]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            {image.caption && (
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-2xl font-bold mb-2">{image.caption}</h3>
                {image.description && (
                  <p className="text-white/90 text-lg">{image.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Play/Pause Button */}
      <Button
        onClick={togglePlayPause}
        size="sm"
        variant="secondary"
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div 
          className="h-full bg-blue-500 transition-all duration-100"
          style={{ 
            width: `${((current + 1) / images.length) * 100}%` 
          }}
        />
      </div>
    </div>
  );
};

export default ImageSlider;