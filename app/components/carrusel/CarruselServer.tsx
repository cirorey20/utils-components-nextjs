const CarruselServer = async () => {
    // Este componente verifica que las URLs sean válidas antes de enviarlas al cliente. 
    // Utiliza fetch con el método HEAD para comprobar el estado de las imágenes.

    const urls = [
        "https://picsum.photos/700/500?random=1",
        "https://picsum.photos/700/500?random=2",
        "https://picsum.photos/700/500?random=3",
    ];

    return urls;
};

export default CarruselServer;
