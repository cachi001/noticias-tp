import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdministrarEmpresa from './Module/AdministrarEmpresa';

export const Index = () => {
    const empresasGuardadas = localStorage.getItem("empresasIndex");
    const [empresas, setEmpresas] = useState(empresasGuardadas ? JSON.parse(empresasGuardadas) : []);
    const [loading, setLoading] = useState(!empresasGuardadas);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);

    const fetchEmpresas = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/empresa/empresasI");
            if (!response.ok) throw new Error("Error al obtener empresas");

            const data = await response.json();
            localStorage.setItem("empresasIndex", JSON.stringify(data));
            setEmpresas(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmpresas(); // Call fetchEmpresas when the component mounts
    }, [empresasGuardadas]);

    const abrirModal = (empresa = null) => {
        setEmpresaSeleccionada(empresa);
        setModalOpen(true);
    };

    const eliminarEmpresa = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta empresa?")) return;

        try {
            await fetch(`http://localhost:8080/empresa/${id}`, { method: 'DELETE' });

            const nuevasEmpresas = empresas.filter(empresa => empresa.id !== id);
            setEmpresas(nuevasEmpresas);

            localStorage.setItem("empresasIndex", JSON.stringify(nuevasEmpresas));

            alert("Empresa eliminada correctamente.");
        } catch (error) {
            alert("Error al eliminar la empresa.");
        }
    };

    return (
        <div>
            <header className='w-full bg-neutral-950 flex items-center justify-between h-20 shadow-2xl px-10'>
                <h1 className='text-2xl text-white'>Lista Empresas</h1>
                <button onClick={() => abrirModal()} className="bg-white text-black px-4 py-2 rounded-sm">Nueva Empresa</button>
            </header>

            <main>
                <div className='flex items-center justify-center p-10'>
                    {loading && <p>Cargando Empresas...</p>}
                    {error && (
                        <div className='flex gap-4 items-center flex-col'>
                            <p className='text-red-600'>{error.message}</p>
                            <button onClick={fetchEmpresas} className='border-1 border-black px-4 py-2 hover:text-white hover:bg-black transition-all cursor-pointer'>
                                Intentar Otra vez
                            </button>
                        </div>
                    )}
                    {!loading && !error && (
                        <table className='auto overflow-hidden'>
                            <thead>
                                <tr>
                                    <th className='border-1 border-black py-1 px-8'>Empresa</th>
                                    <th className='border-1 border-black py-1 px-8'>Ver Página</th>
                                    <th className='border-1 border-black py-1 px-8'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empresas.map((empresa) => (
                                    <tr key={empresa.id}>
                                        <td className='border-1 border-black py-1 px-8'>{empresa.denominacion}</td>
                                        <td className='border-1 border-black py-1 px-8'>
                                            <Link to={`/${empresa.id}/home`} className='text-blue-600 underline'>
                                                VER PAGINA WEB
                                            </Link>
                                        </td>
                                        <td className='border-1 border-black py-1 px-8'>
                                            <button className="text-red-600 underline m-2 cursor-pointer" onClick={() => eliminarEmpresa(empresa.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>

            {modalOpen && (
                <AdministrarEmpresa 
                    empresa={empresaSeleccionada} 
                    cerrarModal={() => setModalOpen(false)} 
                />
            )}
        </div>
    );
};

export default Index;
