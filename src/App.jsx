import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { api } from './api';
import Login from './paginas/Login';
import Menu from './componentes/Menu';
import RutaProtegida from './componentes/RutaProtegida';

export default function App() {
    const [sesion, setSesion] = useState(null);
    const [verificando, setVerificando] = useState(true);

    useEffect(() => {
        api('/auth/yo')
            .then((datos) => setSesion(datos.usuario || datos))
            .catch(() => setSesion(null))
            .finally(() => setVerificando(false));
    }, []);

    if (verificando) return <p style={{ padding: '2rem' }}>Cargando sesión...</p>;

    return (
        <BrowserRouter>
            {sesion && <Menu sesion={sesion} onLogout={() => setSesion(null)} />}
            <Routes>
                <Route
                    path="/login"
                    element={
                        sesion ? (
                            <Navigate to={sesion.inicio || '/catalogo'} replace />
                        ) : (
                            <Login onLoginExitoso={setSesion} />
                        )
                    }
                />
                <Route
                    path="/catalogo"
                    element={
                        <RutaProtegida sesion={sesion} rutaRequerida="/catalogo">
                            <div>Vista Catálogo (Fase 2)</div>
                        </RutaProtegida>
                    }
                />
                <Route
                    path="/carrito"
                    element={
                        <RutaProtegida sesion={sesion} rutaRequerida="/carrito">
                            <div>Vista Carrito (Fase 3)</div>
                        </RutaProtegida>
                    }
                />
                <Route
                    path="/mis-compras"
                    element={
                        <RutaProtegida sesion={sesion} rutaRequerida="/mis-compras">
                            <div>Vista Mis Compras (Fase 3)</div>
                        </RutaProtegida>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <RutaProtegida sesion={sesion} rutaRequerida="/dashboard">
                            <div>Vista Dashboard Estadístico (Fase 4)</div>
                        </RutaProtegida>
                    }
                />
                <Route path="*" element={<Navigate to={sesion ? sesion.inicio || '/catalogo' : '/login'} replace />} />
            </Routes>
        </BrowserRouter>
    );
}