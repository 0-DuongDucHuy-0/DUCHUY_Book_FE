import React, { useState, useEffect } from 'react';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true); // Autoplay flag
    const slides = [
        '../assets/img/slides/slider_item_1_image.webp',
        '../assets/img/slides/slider_item_2_image.webp',
        '../assets/img/slides/slider_item_3_image.webp',
    ];


    // Next slide function
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    // Previous slide function
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Autoplay logic
    useEffect(() => {
        let autoplayInterval;

        if (isAutoplay) {
            autoplayInterval = setInterval(nextSlide, 3000); // Slide every 3 seconds
        }

        return () => {
            if (autoplayInterval) clearInterval(autoplayInterval); // Cleanup on unmount
        };
    }, [isAutoplay]);

    // Stop autoplay on user interaction
    const handleUserInteraction = () => {
        setIsAutoplay(false);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden" onMouseEnter={handleUserInteraction}>
            {/* Slides */}
            <div
                className="flex transition-transform duration-500"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="w-full h-64 flex-shrink-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide})` }}
                    ></div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                onClick={prevSlide}
            >
                &#8592;
            </button>
            <button
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                onClick={nextSlide}
            >
                &#8594;
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Slider;



