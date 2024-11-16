import { useState, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function ProductImage({ images, description }) {
  const [currentImage, setCurrentImage] = useState(images?.[0] || null);
  const ref = useRef();

  function scroll(scrollOffset) {
    ref.current.scrollLeft += scrollOffset;
  }

  return (
    <div className="w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded shadow-lg">
      <div className="relative h-96">
        {currentImage ? (
          <Image
            src={currentImage}
            alt={description}
            layout="fill"
            className="transform duration-500 ease-in-out hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
            No hay imágenes disponibles
          </div>
        )}
      </div>
      {images?.length > 0 && (
        <div className="relative flex border-t border-palette-lighter">
          <button
            aria-label="left-scroll"
            className="h-32 bg-palette-lighter hover:bg-palette-light absolute left-0 z-10 opacity-75"
            onClick={() => scroll(-300)}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="w-3 mx-1 text-palette-primary"
            />
          </button>
          <div
            ref={ref}
            style={{ scrollBehavior: "smooth" }}
            className="flex space-x-1 w-full overflow-auto border-t border-palette-lighter"
          >
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setCurrentImage(image)}
                className="relative w-40 h-32 flex-shrink-0 rounded-sm"
              >
                <Image
                  src={image}
                  alt={description}
                  layout="fill"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <button
            aria-label="right-scroll"
            className="h-32 bg-palette-lighter hover:bg-palette-light absolute right-0 z-10 opacity-75"
            onClick={() => scroll(300)}
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              className="w-3 mx-1 text-palette-primary"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductImage;
