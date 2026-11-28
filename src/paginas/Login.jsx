import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Login({ onLoginExitoso }) {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarPass, setMostrarPass] = useState(false);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            const datos = await api('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ usuario, contrasena }),
            });
            onLoginExitoso(datos.usuario || datos);
            navigate(datos.inicio || datos.usuario?.inicio || '/catalogo', { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-brand">
                    <div className="login-logo">IP</div>
                    <h1>InteliPro</h1>
                    <p>Sistema de Gestión Inteligente de Cadena de Tiendas</p>
                </div>

                <form onSubmit={manejarSubmit}>
                    <div className="form-group">
                        <label htmlFor="usuario">Usuario o correo electrónico</label>
                        <input
                            id="usuario"
                            type="text"
                            className="form-control"
                            placeholder="@gmail.com"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contrasena">Contraseña</label>
                        <div className="input-wrapper">
                            <input
                                id="contrasena"
                                type={mostrarPass ? 'text' : 'password'}
                                className="form-control"
                                placeholder="••••••••"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn-toggle-pass"
                                onClick={() => setMostrarPass(!mostrarPass)}
                            >
                                {mostrarPass ? 'Ocultar' : 'Ver'}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="alert-error" role="alert">
                            <span>⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <button type="submit" className="btn-primary" disabled={cargando}>
                        {cargando ? 'Verificando credenciales...' : 'Iniciar sesión'}
                    </button>
                </form>

                <div className="login-footer">
                    
                </div>
            </div>
        </div>
    );
}