import React from 'react'
import { useEmpresa } from '../context/EmpresaContext';
export const Footer = () => {
    const { empresa  } = useEmpresa();

    return (
        <div>
            <hr className='border-1 border-gray-300'/>
            <div className='h-30 flex justify-center p-10'>
                <div className='lg:w-300 w-300'>
                    <span className='text-sm'>{empresa.denominacion} © 2025 Privacy Policy</span>
                </div>
            </div>
        </div>

    )
}

export default Footer
