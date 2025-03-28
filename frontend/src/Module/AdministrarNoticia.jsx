import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from '../components/Modal';
import { Editor } from '@tinymce/tinymce-react';
import { useEmpresa } from '../context/EmpresaContext';

const AdministrarNoticia = ({ noticia, cerrarModal }) => {
    const { empresa } = useEmpresa();  // Obtener los datos de la empresa del contexto
    const [noticiaData, setNoticiaData] = useState({
        id: '',
        titulo: '',
        resumenNoticia: '',
        imagenNoticia: '',
        contenidoHtml: '',
        publicada: false,
        fechaPublicacion: new Date().toISOString().split('T')[0],
        idEmpresa: empresa?.id,  // Agregar empresaId desde el contexto
    });
    const [verHtml, setVerHtml] = useState(false);  // Estado para manejar si mostrar o no el HTML

    useEffect(() => {
        if (noticia) {
            const { id, titulo, resumenNoticia, imagenNoticia, contenidoHtml, publicada, fechaPublicacion, empresaId } = noticia;
            setNoticiaData({
                id,
                titulo,
                resumenNoticia,
                imagenNoticia,
                contenidoHtml,
                publicada,
                fechaPublicacion,
                idEmpresa: empresaId || empresa?.id,  // Si ya tiene empresaId, lo mantiene, si no, toma el de contexto
            });
        } else {
            setNoticiaData({
                id: '',
                titulo: '',
                resumenNoticia: '',
                imagenNoticia: '',
                contenidoHtml: '',
                publicada: false,
                fechaPublicacion: new Date().toISOString().split('T')[0],
                idEmpresa: empresa?.id,  // Asegurarse de que siempre haya un empresaId
            });
        }
    }, [noticia, empresa]);  // Añadir empresa para que se actualice si cambia el contexto

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNoticiaData({ ...noticiaData, [name]: value });
    };

    const manejarEditorChange = (content) => {
        setNoticiaData({ ...noticiaData, contenidoHtml: content });
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        try {
            let respuesta;
            if (noticiaData.id) {
                // Enviar solicitud para actualizar la noticia en el backend
                respuesta = await axios.put(`http://localhost:8080/noticia/${noticiaData.id}`, noticiaData);
                if (respuesta.status === 200) {
                    // Recuperar el objeto 'empresa' del localStorage
                    const empresa = JSON.parse(localStorage.getItem('empresa'));

                    if (!empresa || !empresa.noticias) {
                        throw new Error('No se encontró la empresa o el array de noticias');
                    }

                    // Buscar la noticia que necesita ser actualizada
                    const noticiasActualizadas = empresa.noticias.map(noticia =>
                        noticia.id === noticiaData.id ? { ...noticia, ...noticiaData } : noticia
                    );

                    // Actualizar el array de noticias en el objeto 'empresa'
                    empresa.noticias = noticiasActualizadas;

                    // Guardar el objeto 'empresa' actualizado en el localStorage
                    localStorage.setItem('empresa', JSON.stringify(empresa));

                    toast.success('Noticia actualizada correctamente');
                    cerrarModal();
                } else {
                    throw new Error('No se pudo actualizar la noticia');
                }
            } else {
                // Enviar solicitud para crear una nueva noticia en el backend
                respuesta = await axios.post(`http://localhost:8080/noticia`, noticiaData);
                if (respuesta.status === 200) {
                    toast.success('Noticia creada correctamente');
                    cerrarModal();
                } else {
                    throw new Error('No se pudo crear la noticia');
                }
            }
        } catch (error) {
            toast.error('Error al procesar la solicitud');
        }
    };

    const manejarVerHtml = () => {
        setVerHtml(!verHtml);  // Alterna el estado para ver el código HTML
    };

    // Función para eliminar la noticia
    const manejarEliminar = async () => {
        if (!noticiaData.id) {
            toast.error('No hay noticia para eliminar');
            return;
        }

        try {
            const respuesta = await axios.delete(`http://localhost:8080/noticia/${noticiaData.id}`);
            if (respuesta.status === 200) {
                // Eliminar la noticia del localStorage
                const empresa = JSON.parse(localStorage.getItem('empresa'));

                if (!empresa || !empresa.noticias) {
                    throw new Error('No se encontró la empresa o el array de noticias');
                }

                // Filtrar la noticia eliminada del array
                const noticiasActualizadas = empresa.noticias.filter(noticia => noticia.id !== noticiaData.id);

                // Actualizar el array de noticias en el objeto 'empresa'
                empresa.noticias = noticiasActualizadas;

                // Guardar el objeto 'empresa' actualizado en el localStorage
                localStorage.setItem('empresa', JSON.stringify(empresa));

                toast.success('Noticia eliminada correctamente');
                cerrarModal();
            } else {
                throw new Error('No se pudo eliminar la noticia');
            }
        } catch (error) {
            toast.error('Error al eliminar la noticia');
        }
    };

    return (
        <Modal estiloContainer="fixed top-0 left-0 w-full h-full backdrop-blur bg-opacity-75 flex items-center justify-center p-4 overflow-auto z-1000" estiloContenido={'h-full w-220 flex justify-center'}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-full overflow-auto relative">
                <h2 className='text-center p-4 text-slate-950 font-semibold text-2xl'>
                    {noticiaData.id ? 'Modificar Noticia' : 'Nueva Noticia'}
                </h2>
                <form onSubmit={manejarSubmit} className="h-full flex flex-col">
                    <div className='flex p-1 gap-2 flex-col'>
                        <label>Título</label>
                        <input
                            className='border-b border-black focus:outline-0 p-2'
                            type="text"
                            name="titulo"
                            value={noticiaData.titulo}
                            onChange={manejarCambio}
                            required
                        />
                    </div>
                    <div className='flex p-1 gap-2 flex-col'>
                        <label>Resumen</label>
                        <input
                            className='border-b border-black focus:outline-0 p-2'
                            type="text"
                            name="resumenNoticia"
                            value={noticiaData.resumenNoticia}
                            onChange={manejarCambio}
                            required
                        />
                    </div>
                    <div className='flex p-1 gap-2 flex-col'>
                        <label>Imagen URL</label>
                        <input
                            className='border-b border-black focus:outline-0 p-2'
                            type="text"
                            name="imagenNoticia"
                            value={noticiaData.imagenNoticia}
                            onChange={manejarCambio}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between mt-4 mb-4">
                        <label>Contenido</label>
                        <button
                            type="button"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
                            onClick={manejarVerHtml}
                        >
                            {verHtml ? 'Ocultar HTML' : 'Ver HTML'}
                        </button>
                    </div>
                    <div className='mb-4'>
                        <Editor
                            apiKey="h6gc102bd3mxo7iofare16a7qm2wra9rqtjvlrnxg35udxfr"
                            value={noticiaData.contenidoHtml}
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                    'emoticons codesample autosave',
                                ],
                                toolbar: 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code preview | forecolor backcolor emoticons',
                            }}
                            onEditorChange={manejarEditorChange}
                        />
                    </div>
                    {verHtml && (
                        <div className="p-2 bg-gray-100 rounded mt-4">
                            <h3 className="font-semibold">Código HTML de la Noticia</h3>
                            <textarea
                                readOnly
                                className="w-full h-40 p-2 border border-gray-300 mt-2"
                                value={noticiaData.contenidoHtml}
                            />
                        </div>
                    )}
                    <div className='flex p-1 gap-2 flex-col'>
                        <label>Fecha de Publicación</label>
                        <input
                            className='border-b border-black focus:outline-0 p-2'
                            type="date"
                            name="fechaPublicacion"
                            value={noticiaData.fechaPublicacion}
                            onChange={manejarCambio}
                            required
                        />
                    </div>
                    <div className='flex p-1 gap-2 flex-col'>
                        <label>Publicada</label>
                        <select
                            name="publicada"
                            value={noticiaData.publicada}
                            onChange={manejarCambio}
                            className="border-b border-black focus:outline-0 p-2"
                        >
                            <option value={false}>No</option>
                            <option value={true}>Sí</option>
                        </select>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer" onClick={manejarEliminar}>
                            Eliminar
                        </button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer">
                            {noticiaData.id ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AdministrarNoticia;