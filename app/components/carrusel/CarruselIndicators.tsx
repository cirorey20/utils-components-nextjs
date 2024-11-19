import React from "react";

interface CarruselIndicatorsProps {
    items: string[];
    currentIndex: number;
    toClick: (index: number) => void
}

const CarruselIndicators: React.FC<CarruselIndicatorsProps> = ({items, currentIndex, toClick}) => {
    return (
        <>
            {items.map((_, index) => (
                <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'
                        }`}
                    onClick={() => toClick(index)}
                />
            ))}
        </>
    )
}

export default CarruselIndicators;