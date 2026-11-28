import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { api } from './api';
import { ProveedorCarrito } from './estado/carrito';
import Login from './paginas/Login';
import Menu from './componentes/Menu';
import RutaProtegida from './componentes/RutaProtegida';
import Catalogo from './paginas/Catalogo';
import Carrito from './paginas/Carrito';
import Pago from './paginas/Pago';
import Comprobante from './paginas/Comprobante';
import MisCompras from './paginas/MisCompras';
import Dashboard from './paginas/Dashboard';

export default function App() {
    const [sesion, setSesion] = useState(null);
    const [verificando, setVerificando] = useState(true);

    useEffect(() => {
        api('/auth/yo')
            .then((datos) => setSesion(datos.usuario || datos))
            .catch(() => setSesion(null))
            .finally(() => setVerificando(false));
    }, []);

    if (verificando) {
        return (
            <div className="login-wrapper">
                <div className="login-card" style={{ textAlign: 'center' }}>
                    <p>Cargando sesión de InteliPro...</p>
                </div>
            </div>
        );
    }

    return (
        <ProveedorCarrito>
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
                                <main className="main-container">
                                    <Catalogo />
                                </main>
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="/carrito"
                        element={
                            <RutaProtegida sesion={sesion} rutaRequerida="/carrito">
                                <main className="main-container">
                                    <Carrito />
                                </main>
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="/pago"
                        element={
                            <RutaProtegida sesion={sesion} rutaRequerida="/pago">
                                <main className="main-container">
                                    <Pago />
                                </main>
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="/comprobante"
                        element={
                            <RutaProtegida sesion={sesion} rutaRequerida="/comprobante">
                                <main className="main-container">
                                    <Comprobante />
                                </main>
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="/mis-compras"
                        element={
                            <RutaProtegida sesion={sesion} rutaRequerida="/mis-compras">
                                <main className="main-container">
                                    <MisCompras />
                                </main>
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <RutaProtegida sesion={sesion} rutaRequerida="/dashboard">
                                <main className="main-container">
                                    <Dashboard sesion={sesion} />
                                </main>
                            </RutaProtegida>
                        }
                    />
                    <Route
                        path="*"
                        element={<Navigate to={sesion ? sesion.inicio || '/catalogo' : '/login'} replace />}
                    />
                </Routes>
            </BrowserRouter>
        </ProveedorCarrito>
    );
}