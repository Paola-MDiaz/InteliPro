import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, MODO_PRUEBA } from '../api';

export default function Login({ onLoginExitoso }) {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarPass, setMostrarPass] = useState(false);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const entrarConUsuario = async (user, pass) => {
        setError('');
        setCargando(true);
        try {
            const datos = await api('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ usuario: user, contrasena: pass }),
            });
            onLoginExitoso(datos.usuario || datos);
            navigate(datos.inicio || datos.usuario?.inicio || '/catalogo', { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        entrarConUsuario(usuario, contrasena);
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
                            placeholder="*****@correo.com"
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

                {MODO_PRUEBA && (
                    <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed #cbd5e1' }}>
                        <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem', textAlign: 'center' }}>
                            Acceso rápido (Modo prueba sin servidor):
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <button type="button" className="nav-link" style={{ border: '1px solid #e2e8f0' }} onClick={() => entrarConUsuario('cliente', '1234')}>
                                Entrar como Cliente
                            </button>
                            <button type="button" className="nav-link" style={{ border: '1px solid #e2e8f0' }} onClick={() => entrarConUsuario('vendedor', '1234')}>
                                Entrar como Vendedor
                            </button>
                            <button type="button" className="nav-link" style={{ border: '1px solid #e2e8f0' }} onClick={() => entrarConUsuario('gerente', '1234')}>
                                Entrar como Gerente
                            </button>
                            <button type="button" className="nav-link" style={{ border: '1px solid #e2e8f0' }} onClick={() => entrarConUsuario('admin', '1234')}>
                                Entrar como Admin
                            </button>
                        </div>
                    </div>
                )}

                <div className="login-footer">

                </div>
            </div>
        </div>
    );
}