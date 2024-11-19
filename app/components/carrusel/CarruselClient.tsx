'use client';

import React, { useState, useEffect } from 'react';
import CarruselImages from './CarruselImages';
import CarruselIndicators from './CarruselIndicators';

interface CarruselClientProps {
  items: string[];
}

const CarruselClient: React.FC<CarruselClientProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Intervalo automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [items.length]);

  // Pre-carga de imágenes
  useEffect(() => {
    items.forEach((item) => {
      const img = new Image();
      img.src = item;

      img.onload = () => {
        setLoadedImages((prev) => [...prev, item]);
      };

      img.onerror = () => {
        console.error(`Error al cargar la imagen: ${item}`);
      };
    });
  }, [items]);

  // Inicia el deslizamiento táctil
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  // Detecta el movimiento táctil
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDeltaX(e.touches[0].clientX - startX);
  };

  // Finaliza el deslizamiento táctil
  const handleTouchEnd = () => {
    if (!isDragging) return;

    if (deltaX > 50) {
      // Deslizar hacia la derecha (anterior)
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (deltaX < -50) {
      // Deslizar hacia la izquierda (siguiente)
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }

    setIsDragging(false);
    setStartX(0);
    setDeltaX(0);
  };

  // Cambiar a una imagen específica al hacer clic en un indicador
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };


  return (
    <>
      <div
        className="relative overflow-hidden bg-gray-300 w-full h-80"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Contenedor interno para deslizamiento */}
        <div
          className={`flex transition-transform duration-500 ease-in-out`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Mueve el carrusel horizontalmente
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full h-80 flex-shrink-0 flex justify-center items-center"
            >
              <CarruselImages isLoaded={loadedImages.includes(item)} src={item} />
            </div>
          ))}
        </div>

        {/* Indicadores (puntos) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <CarruselIndicators 
            items={items}
            currentIndex={currentIndex}
            toClick={(index) => setCurrentIndex(index)}
          />
        </div>
      </div>

    </>
  )
}

export default CarruselClient;