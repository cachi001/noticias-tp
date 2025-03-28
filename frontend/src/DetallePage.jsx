import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { useEmpresa } from './context/EmpresaContext'
import { useParams} from 'react-router-dom'

export const Detalle = () => {
    const { noticiaId } = useParams(); 
    const { noticias } = useEmpresa();
    
    const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
    
    useEffect(() => {
        const idNoticiaNum = Number(noticiaId);
        const selectedNoticia = noticias?.find(n => n.id === idNoticiaNum);
        setNoticiaSeleccionada(selectedNoticia);
    }, [noticiaId, noticias]);

    // Manejar el caso en que no se encuentra la noticia
    if (!noticiaSeleccionada) {
        return <p>Cargando</p>
    }

    return (
        <div>
            <Header />
            <section className='py-6'>
                <div 
                    className='w-full h-150 bg-gray-500 flex items-center justify-center' 
                    style={{
                        backgroundImage: `url(${noticiaSeleccionada.imagenNoticia})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className='w-full bg-black opacity-80 flex flex-col items-center justify-center py-14 gap-4'>
                        <span className='lg:text-6xl md:text-5xl font-bold text-6xl text-center text-white'>{noticiaSeleccionada.titulo}</span>
                    </div>
                </div>
            </section>
            <section className='flex py-6 justify-center mx-10'>
                <div className='lg:w-300 w-300 flex justify-center flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <span className='lg:text-lg font-semibold text-slate-900'>Fecha Publicación</span>
                        <span className='text-sky-500'>{noticiaSeleccionada.fechaPublicacion}</span>
                    </div>
                    <hr className='border-1 border-gray-300'/>
                    <div className='flex flex-col gap-4'>
                        <span className='lg:text-lg text-lg font-semibold text-slate-900'>Resumen</span>
                        <p className='font-semibold'>{noticiaSeleccionada.resumenNoticia}</p>
                    </div>
                    <hr className='border-1 border-gray-300'/>
                    <div className='flex flex-col gap-4'>
                        <span className='lg:text-2xl text-xl font-bold text-slate-900'>Noticia</span>
                        <div dangerouslySetInnerHTML={{ __html: noticiaSeleccionada.contenidoHtml }} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Detalle;
