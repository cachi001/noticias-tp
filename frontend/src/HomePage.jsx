import { Header } from './components/Header';
import Mapa from './components/Mapa';
import { Footer } from './components/Footer';
import { useEmpresa } from './context/EmpresaContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';  // Importar los estilos de paginación
import { Pagination, Autoplay } from 'swiper/modules';

export const Home = () => {
    const { empresa } = useEmpresa();


    // Ordenar las noticias por fecha descendente y tomar las últimas 5
    const ultimasNoticias = empresa?.noticias
        ?.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha descendente
        .slice(0, 5) || []; // Tomar las primeras 5 después de ordenar

    if (!empresa) return <p className='w-full mx-auto my-50'>Cargando Empresa...</p>;

    return (
        <div>
            <Header />

            {/* Swiper con Noticias */}
            <section className='py-6'>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{
                        clickable: true,
                        type: 'bullets', // Para que use los círculos de paginación
                    }}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    className='w-full'
                >
                    {ultimasNoticias.length > 0 ? (
                        ultimasNoticias.map((noticia, index) => (
                            <SwiperSlide key={index}>
                                <Link to={`/${empresa.id}/detalle/${noticia.id}`}>
                                    <div className='h-140 bg-gray-500 flex items-center justify-center' 
                                        style={{ 
                                            backgroundImage: `url(${noticia.imagenNoticia || 'https://media.telemundo51.com/2025/03/argentinabrasil.jpg?quality=85&strip=all'})`,
                                            backgroundRepeat: "no-repeat", 
                                            backgroundSize: "cover" 
                                        }}
                                    >
                                        <div className='w-full bg-sky-400 opacity-90 flex flex-col items-center justify-center py-8 px-10 gap-6'>
                                            <span className='lg:text-8xl md:text-7xl text-6xl font-bold text-white text-center'>
                                                {noticia.titulo}
                                            </span>
                                            <p className='text-white'>{noticia.resumenNoticia}</p>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <div className='h-140 bg-sky-400 opacity-70 flex flex-col items-center justify-center py-8 px-10 gap-4'>
                                <p className='text-white text-4xl font-bold'>No hay noticias disponibles</p>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </section>

            {/* Sección "Quiénes Somos" */}
            <section className='flex py-6 justify-center mx-10'>
                <div className='lg:w-300 w-300 flex justify-center p-6 flex-col gap-6'>
                    <span className='lg:text-6xl font-bold text-sky-400 pl-4'>QUIÉNES SOMOS</span>
                    <p>{empresa.quienesSomos}</p>
                </div>
            </section>

            <hr className='border-1 border-gray-300' />

            {/* Sección "Dónde Estamos" */}
            <section>
                <div className='flex py-6 justify-center mx-10'>
                    <div className='lg:w-300 w-300 flex justify-center p-6 flex-col gap-6'>
                        <span className='lg:text-6xl font-bold text-sky-400 pl-4'>DÓNDE ESTAMOS</span>
                    </div>
                </div>
                <div className='h-130'>
                    <Mapa />
                </div>
            </section>

            <Footer />
        </div>
        
    );
};

export default Home;
