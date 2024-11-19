import CarruselClient from "./CarruselClient";
import CarruselServer from "./CarruselServer";

const Carrusel: React.FC = async () => {

  const items = await CarruselServer();

  return <CarruselClient items={items} />;
}

export default Carrusel;