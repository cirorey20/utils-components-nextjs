import React from "react";

interface CarruselImagesProps {
    isLoaded: boolean;
    src: string;
}

const CarruselImages: React.FC<CarruselImagesProps> = ({isLoaded, src}) => {
    return (
        <>
            {isLoaded ? (
                <img
                    src={src}
                    alt=""
                    className="object-cover h-full w-full"
                />
            ) : (
                <div className="animate-pulse bg-gray-300 w-full h-80 flex justify-center items-center">
                    <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
            )}
        </>
    )
}

export default CarruselImages;