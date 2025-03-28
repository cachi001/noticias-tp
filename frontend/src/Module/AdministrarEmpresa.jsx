import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from '../components/Modal';

const AdministrarEmpresa = ({ empresa, cerrarModal }) => {
    const [empresaData, setEmpresaData] = useState({
        id: '',
        denominacion: '',
        telefono: '',
        horarioAtencion: '',
        quienesSomos: '',
        latitud: '',
        longitud: '',
        domicilio: '',
        email: '',
    });

    useEffect(() => {
        if (empresa) {
            const { id, denominacion, telefono, horarioAtencion, quienesSomos, latitud, longitud, domicilio, email } = empresa;
            setEmpresaData({
                id,
                denominacion,
                telefono,
                horarioAtencion,
                quienesSomos,
                latitud,
                longitud,
                domicilio,
                email
            });
        } else {
            setEmpresaData({
                id: '',
                denominacion: '',
                telefono: '',
                horarioAtencion: '',
                quienesSomos: '',
                latitud: '',
                longitud: '',
                domicilio: '',
                email: ''
            });
        }
    }, [empresa]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setEmpresaData({ ...empresaData, [name]: value });
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        try {
            // Revisamos si tenemos un ID, para saber si se trata de una modificación o una creación
            let respuesta;
            if (empresaData.id) {
                // Si ya tiene un id, significa que estamos actualizando la empresa
                console.log('actualizando')
                respuesta = await axios.put(`http://localhost:8080/empresa/${empresaData.id}`, empresaData);

                // Solo si la respuesta fue exitosa (código 200)
                if (respuesta.status === 200) {
                    toast.success('Empresa modificada correctamente');
                    // Actualizar los datos de la empresa en el localStorage
                    cerrarModal();
                } else {
                    throw new Error('No se pudo modificar la empresa');
                }
            } else {
                // En caso de que no tenga ID, estamos creando una nueva empresa
                respuesta = await axios.post('http://localhost:8080/empresa', empresaData);
                if (respuesta.status === 201) {
                    toast.success('Empresa creada correctamente');
                    actualizarLocalStorage(respuesta.data);
                    cerrarModal();
                } else {
                    throw new Error('No se pudo crear la empresa');
                }
            }
        } catch (error) {
            // Si algo falla, mostramos el error en la interfaz
            console.error('Error en la solicitud', error);
            toast.error('Error al procesar la solicitud');
        }
    };

    const manejarEliminar = async () => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta empresa?");
        if (!confirmar) return;

        try {
            const respuesta = await axios.delete(`http://localhost:8080/empresa/${empresaData.id}`);
            if (respuesta.status === 200) {
                toast.success('Empresa eliminada correctamente');
                eliminarDeLocalStorage(empresaData.id);
                cerrarModal();
            } else {
                throw new Error('No se pudo eliminar la empresa');
            }
        } catch (error) {
            console.error('Error al eliminar la empresa', error);
            toast.error('Error al eliminar la empresa');
        }
    };
    const actualizarLocalStorage = (empresaActualizada) => {
        // Obtener el objeto de empresasIndex del localStorage
        let empresasGuardadas = JSON.parse(localStorage.getItem("empresasIndex")) || [];
        
        // Actualizar el objeto en el arreglo de empresasGuardadas, si la empresa existe en el arreglo
        empresasGuardadas = empresasGuardadas.map(empresa =>
            empresa.id === empresaActualizada.id 
            ? { ...empresa, denominacion: empresaActualizada.denominacion } 
            : empresa
        );
        localStorage.setItem("empresasIndex", JSON.stringify(empresasGuardadas));
    
        // Verificar y actualizar la empresa seleccionada en localStorage
        let empresaCompletada = JSON.parse(localStorage.getItem("empresa"));
        if (empresaCompletada && empresaCompletada.id === empresaActualizada.id) {
            localStorage.setItem("empresa", JSON.stringify(empresaActualizada));
        }
    };
    
    

    const eliminarDeLocalStorage = (empresaId) => {
        let empresasGuardadas = JSON.parse(localStorage.getItem("empresasIndex")) || [];
        empresasGuardadas = empresasGuardadas.filter(empresa => empresa.id !== empresaId);
        localStorage.setItem("empresasIndex", JSON.stringify(empresasGuardadas));

        let empresasCompletas = JSON.parse(localStorage.getItem("empresa")) || [];
        empresasCompletas = empresasCompletas.filter(empresa => empresa.id !== empresaId);
        localStorage.setItem("empresa", JSON.stringify(empresasCompletas));
    };

    return (
        <Modal estiloContenido="bg-gray-200 lg:w-250 w-140 px-10 py-4 flex flex-col justify-center relative overflow-auto" estiloContainer={"fixed inset-0 bg-opacity-20 backdrop-blur-md flex justify-center items-center z-2000"}>
            <div>
                <h2 className='text-center p-4 text-slate-950 font-semibold text-2xl'>
                    {empresaData.id ? 'Modificar Empresa' : 'Nueva Empresa'}
                </h2>
                <form onSubmit={manejarSubmit}>
                    {Object.keys(empresaData).map((key) => (
                        key !== 'id' && (
                            <div key={key} className='flex p-1 gap-2 flex-col'>
                                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                <input 
                                    className='border-b-1 border-black focus:outline-0' 
                                    type={key === 'email' ? 'email' : key.includes('latitud') || key.includes('longitud') ? 'number' : 'text'}
                                    step={key.includes('latitud') || key.includes('longitud') ? '0.0001' : undefined}
                                    name={key} 
                                    value={empresaData[key]} 
                                    onChange={manejarCambio} 
                                    required 
                                />
                            </div>
                        )
                    ))}
                    <div className='flex items-center justify-center mt-4 gap-4'>
                        <button className='cursor-pointer px-10 py-2 border-1 border-black hover:bg-black hover:text-white transition-all' type="submit">
                            {empresaData.id ? 'Actualizar' : 'Crear'}
                        </button>
                        {empresaData.id && 
                            <button type="button" onClick={manejarEliminar} className="text-red-600 border-1 border-red-600 px-6 py-2 hover:bg-red-600 hover:text-white transition-all cursor-pointer">
                                Eliminar
                            </button>
                        }
                    </div>
                </form>
                <button className='absolute right-0 top-0 p-4 font-semibold cursor-pointer' onClick={cerrarModal}>✖</button>
            </div>
            <ToastContainer />
        </Modal>
    );
};

export default AdministrarEmpresa;
