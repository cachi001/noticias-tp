import React, { useContext } from 'react'
import BarraNavegacion from './BarraNavegacion';
import { useEmpresa } from '../context/EmpresaContext';

export const Header = () => {
    const { empresa } = useEmpresa();

    return (
        <div>
            <div className='flex justify-center h-46 pb-6 mx-10'>
                <div className='lg:w-300 w-300 flex justify-between'>
                    <div className='h-34 bg-sky-400 flex items-center px-8'>
                        <h1 className='text-4xl text-white font-semibold'>{empresa.denominacion}</h1>
                    </div>
                    <div className='flex flex-col text-right justify-end gap-1'>
                        <p className='text-3xl font-bold text-slate-900'>TELEFONO</p>
                        <div>

                            <span className='text-5xl text-sky-400 font-bold'>{empresa.telefono}</span>
                        </div>
                        <small className='flex gap-2 justify-end px-2'>
                            <span className='font-bold text-gray-800'>Horario:</span>
                            <span>{empresa.horarioAtencion}</span>
                        </small>
                    </div>
                </div>

            </div>
            <hr className='border-1 border-gray-300'/>
            <BarraNavegacion id={empresa.id}></BarraNavegacion>

            <hr className='border-1 border-gray-300'/>
        </div>
    )
}

export default Header;