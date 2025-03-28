import { createContext, useContext, useState, useEffect } from "react";

const EmpresaContext = createContext();
export const useEmpresa = () => useContext(EmpresaContext);

export const EmpresaProvider = ({ children, idEmpresa }) => {
    const empresaGuardada = localStorage.getItem("empresa");

    const [empresa, setEmpresa] = useState(empresaGuardada ? JSON.parse(empresaGuardada) : null);
    const [noticias, setNoticias] = useState(empresaGuardada ? JSON.parse(empresaGuardada).noticias || [] : []);

    useEffect(() => {
        const empresaGuardada = localStorage.getItem("empresa");
        if (empresaGuardada) {
            try {
                const parsedEmpresa = JSON.parse(empresaGuardada);
                if (parsedEmpresa?.id === idEmpresa) {
                    setEmpresa(parsedEmpresa);
                    setNoticias(parsedEmpresa.noticias || []);
                    return;
                }
            } catch (error) {
                console.error("Error al parsear empresa del localStorage:", error);
            }
        }

        if (!idEmpresa) return;

        const fetchEmpresa = async () => {
            try {
                console.log(`Fetching empresa ID: ${idEmpresa}...`);
                const response = await fetch(`http://localhost:8080/empresa/${idEmpresa}`);
                if (!response.ok) throw new Error("Error al cargar Empresa");

                const data = await response.json();
                if (data) {
                    localStorage.setItem("empresa", JSON.stringify(data));
                    setEmpresa(data);
                    setNoticias(data.noticias || []);
                }
            } catch (error) {
                console.error("Error en fetchEmpresa:", error);
            }
        };

        fetchEmpresa();
    }, [idEmpresa]);

    return (
        <EmpresaContext.Provider value={{ empresa, noticias }}>
            {children}
        </EmpresaContext.Provider>
    );
};
