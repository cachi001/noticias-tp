import { useEffect } from 'react';

export const Modal = ({ estiloContenido, estiloContainer, children }) => {
    return (
        <div className={`${estiloContainer}`}>
            <div className={`bg-white p-6 rounded-lg shadow-2xl ${estiloContenido}`}>
                {children}
            </div>
        </div>
    );
};
