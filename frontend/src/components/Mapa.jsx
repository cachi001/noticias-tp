import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';  // Importar Leaflet para poder personalizar el marcador
import 'leaflet/dist/leaflet.css';
import { useEmpresa } from '../context/EmpresaContext';

const Mapa = () => {

    const { empresa } = useEmpresa();

  // Crear un icono personalizado
    const customIcon = new L.Icon({
        iconUrl: 'https://images.icon-icons.com/1559/PNG/512/3440906-direction-location-map-marker-navigation-pin_107531.png', // Ruta a tu imagen personalizada
        iconSize: [40, 40], // Tamaño del ícono
        iconAnchor: [16, 32], // Punto de anclaje del ícono
        popupAnchor: [0, -32], // Donde se muestra el popup en relación al ícono
    });

    return (
        <MapContainer
        center={[empresa.latitud, empresa.longitud]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        >
        {/* Capa de OpenStreetMap */}
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={[empresa.latitud, empresa.longitud]} icon={customIcon}>
            <Popup>
            <div>
                <span className='text-2xl text-slate-900 font-bold'>{empresa.denominacion}</span>
                <div>
                    <span className='text-sky-500 font-semibold'>Telefono: </span>
                    <span className='text-slate-900'>{empresa.telefono}</span>
                </div>
                <div>
                    <span className='text-sky-500 font-semibold'>Domicilio: </span>
                    <span className='text-slate-900'>{empresa.domicilio}</span>
                </div>
                <div>
                    <span className='text-sky-500 font-semibold'>Email: </span>
                    <span className='text-slate-900'>{empresa.email}</span>
                </div>
            </div>
            </Popup>
        </Marker>
        </MapContainer>
    );
};

export default Mapa;
