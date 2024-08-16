import React, { useEffect, useState } from "react";
import axios from "axios";
const CarouselGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [images, setImages] = useState([]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    fetch("./images.json")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          ...item,
          image: `/image/top-bg-game/${item.image}.webp`,
        }));
        setImages(formattedData);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false);
      }, 500); // Thời gian của hiệu ứng chuyển đổi
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, images.length]);
  return (
    <div className="flex">
      <div className="w-10/12 relative ">
        <img
          src={images[currentIndex]?.image}
          alt={`Slide ${currentIndex + 1}`}
          className={`w-full h-auto object-contain rounded-3xl transform transition-opacity duration-500 ${
            isFading ? "opacity-20" : "opacity-100"
          }`}
        />
        {/* <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        >
          &gt;
        </button> */}
      </div>
      <div className="w-3/12 ms-5 ">
        {images.map((image, index) => (
          <div
            className={`rounded-xl h-auto ${
              index === currentIndex
                ? "bg-customBgBtnCarouselActive"
                : "bg-customBgBtnCarousel"
            } transition-transform duration-500 ease-in-out hover:scale-110`}
          >
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex items-center p-2 py-4 cursor-pointer rounded-full my-1`}
            >
              <img
                src={images[index]?.image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-10 object-cover rounded-lg`}
              />
              <span className="text-white ms-2 text-sm">
                {images[index]?.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselGame;
