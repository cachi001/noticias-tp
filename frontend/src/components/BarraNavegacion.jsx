import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEmpresa } from '../context/EmpresaContext';
import { useParams } from 'react-router-dom';
import AdministrarEmpresa from '../Module/AdministrarEmpresa';
import AdministrarNoticia from '../Module/AdministrarNoticia';

export const BarraNavegacion = () => {
    const { empresa } = useEmpresa();
    const { noticiaId } = useParams();  // Obtener el ID de la noticia desde los parámetros de la URL
    const [noticia, setNoticia] = useState(null);  // Estado para almacenar la noticia seleccionada
    const [resultadoBusqueda, setResultadoBusqueda] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTipo, setModalTipo] = useState("");  // Estado para controlar el tipo de modal

    // Función para obtener la noticia seleccionada
    const obtenerNoticia = () => {
        if (noticiaId) {
            const noticiaEncontrada = empresa.noticias.find(n => n.id === Number(noticiaId));  // Suponiendo que la noticia es parte de la empresa
            setNoticia(noticiaEncontrada);
        }
    };

    useEffect(() => {
        obtenerNoticia();  // Al cambiar el ID de la noticia en la URL, se obtiene la noticia
    }, [noticiaId]);

    const abrirModal = (tipoModal) => {
        setModalTipo(tipoModal);
        setModalOpen(true);
    };

    const cerrarModal = () => {
        setModalOpen(false);
        setModalTipo("");
    };

    return (
        <nav className={`flex items-center justify-center gap-2 mx-10`}>
            <div className={`lg:w-300 w-300 flex items-center justify-between py-4 gap-4`}>
                <div className='flex items-center justify-center gap-2'>
                    <Link to={`/${empresa.id}/home`}>
                        <button className='bg-slate-800 text-white py-3 px-4 text-lg font-bold cursor-pointer hover:bg-slate-700 transition-all'>
                            Inicio
                        </button>
                    </Link>
                    <Link to={"/"}>
                        <button className='bg-white text-gray-800 border-1 border-slate-800 py-3 px-4 text-lg font-bold cursor-pointer hover:bg-slate-800 hover:text-white transition-all'>
                            Empresas
                        </button>
                    </Link>
                    <button
                        onClick={() => abrirModal("empresa")}
                        className='bg-white text-gray-800 border-1 border-slate-800 py-3 px-4 text-lg font-bold cursor-pointer hover:bg-slate-800 hover:text-white transition-all'>
                        Modificar Empresa
                    </button>
                    <button
                        onClick={() => abrirModal("noticia")}
                        className='bg-white text-gray-800 border-1 border-slate-800 py-3 px-4 text-lg font-bold cursor-pointer hover:bg-slate-800 hover:text-white transition-all'>
                        {noticia ? "Modificar Noticia" : "Crear Noticia"}  {/* Cambia el texto según si hay una noticia seleccionada */}
                    </button>
                </div>
                <form className='flex gap-4'>
                    <input
                        type="text"
                        placeholder='Ingrese Noticia'
                        className='lg:w-70 md:w-60 border-1 border-gray-300 focus:outline-sky-400 px-2'
                        value={resultadoBusqueda}
                        onChange={(e) => setResultadoBusqueda(e.target.value)}
                    />
                    <Link to={`/${empresa.id}/buscador?resultado=${encodeURIComponent(resultadoBusqueda)}`}>
                        <button className='py-2 px-4 text-slate-800 bg-white text-md border-1 border-gray-300 font-semibold cursor-pointer hover:bg-sky-400 hover:text-white transition-all rounded-sm'>
                            Buscar
                        </button>
                    </Link>
                </form>
            </div>
            {modalOpen && modalTipo === "empresa" && (
                <AdministrarEmpresa empresa={empresa} cerrarModal={cerrarModal} />
            )}
            {modalOpen && modalTipo === "noticia" && (
                <AdministrarNoticia noticia={noticia} cerrarModal={cerrarModal} />
            )}
        </nav>
    );
};

export default BarraNavegacion;
