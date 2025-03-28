import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEmpresa } from './context/EmpresaContext';
import Header from './components/Header';
import Footer from './components/Footer';

export const Buscador = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const resultado = queryParams.get("resultado");
    const resultadoBusqueda = decodeURIComponent(resultado || "");

    const { empresa, noticias } = useEmpresa();


    if (!resultadoBusqueda.trim()) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='h-full flex flex-col items-center p-12 gap-8'>
                    <p className='text-slate-900 text-2xl text-center'>Por favor ingrese un término de búsqueda.</p>
                    <Link to={`/${empresa.id}/home`}>
                        <button className='border border-black py-2 px-6 bg-slate-800 text-white text-xl hover:bg-slate-600 w-40 cursor-pointer'>
                            Regresar
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    // Filtrar y ordenar noticias
    const noticiasFiltradas = noticias
        .filter(noticia =>
            noticia.titulo.toLowerCase().includes(resultadoBusqueda.toLowerCase()) ||
            noticia.resumenNoticia.toLowerCase().includes(resultadoBusqueda.toLowerCase())
        )
        .sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion)); // Orden descendente

    // Estado para el paginador
    const [paginaActual, setPaginaActual] = useState(1);
    const noticiasPorPagina = 20;
    const totalPaginas = Math.ceil(noticiasFiltradas.length / noticiasPorPagina);

    // Obtener noticias de la página actual
    const indexInicio = (paginaActual - 1) * noticiasPorPagina;
    const indexFin = indexInicio + noticiasPorPagina;
    const noticiasPaginadas = noticiasFiltradas.slice(indexInicio, indexFin);

    return (
        <div>
            <Header />
            <section className='flex py-6 justify-center mx-10'>
                <div className='lg:w-300 w-300 flex justify-center flex-col gap-14'>
                    <span className='text-slate-900 font-bold text-6xl'>{resultadoBusqueda}</span>

                    {noticiasPaginadas.length > 0 ? (
                        <>
                            {noticiasPaginadas.map(noticia => (
                                <Link key={noticia.id} to={`/${empresa.id}/detalle/${noticia.id}`} className="block">
                                    <div className='flex gap-10 pb-4'>
                                        <div className='h-32 lg:w-100'>
                                            <img src={`${noticia.imagenNoticia}`} alt="noticia" className='h-30 w-90 object-cover' />
                                        </div>
                                        <div className='flex flex-col gap-2 w-full'>
                                            <span className='text-2xl font-semibold'>{noticia.titulo}</span>
                                            <div className='flex justify-between text-lg'>
                                                <span>{noticia.resumenNoticia}</span>
                                                <span className='text-sky-400'>{noticia.fechaPublicacion}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='border border-gray-300' />
                                </Link>
                            ))}

                            {/* Paginador */}
                            <div className="flex justify-center items-center gap-4 mt-6">
                                <button
                                    className={`px-4 py-2 border rounded-sm ${paginaActual === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                    onClick={() => setPaginaActual(paginaActual - 1)}
                                    disabled={paginaActual === 1}
                                >
                                    Anterior
                                </button>
                                <span className="text-lg font-bold">{paginaActual} / {totalPaginas}</span>
                                <button
                                    className={`px-4 py-2 border rounded-sm ${paginaActual === totalPaginas ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                    onClick={() => setPaginaActual(paginaActual + 1)}
                                    disabled={paginaActual === totalPaginas}
                                >
                                    Siguiente
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className='text-slate-900 text-4xl text-center py-20'>
                            No se encontraron noticias para "{resultadoBusqueda}"
                        </p>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Buscador;
