import { NavLink, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useCarrito } from '../estado/carrito';

export default function Menu({ sesion, onLogout }) {
    const navigate = useNavigate();
    const { totalArticulos } = useCarrito();

    const permisos = sesion?.permisos || sesion?.rutas || [];
    const tienePermiso = (ruta) => permisos.length === 0 || permisos.includes(ruta);

    const cerrarSesion = async () => {
        try {
            await api('/auth/logout', { method: 'POST' });
        } finally {
            onLogout();
            navigate('/login', { replace: true });
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <div className="navbar-brand">
                    <span className="navbar-badge-logo">IP</span>
                    <span>InteliPro</span>
                </div>

                <nav className="navbar-links">
                    {tienePermiso('/catalogo') && (
                        <NavLink to="/catalogo" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Catálogo
                        </NavLink>
                    )}

                    {tienePermiso('/carrito') && (
                        <NavLink to="/carrito" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Carrito {totalArticulos > 0 && <span className="cart-badge">{totalArticulos}</span>}
                        </NavLink>
                    )}

                    {tienePermiso('/mis-compras') && (
                        <NavLink to="/mis-compras" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Mis compras
                        </NavLink>
                    )}

                    {tienePermiso('/dashboard') && (
                        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            Dashboard
                        </NavLink>
                    )}
                </nav>
            </div>

            <div className="navbar-right">
                <div className="user-pill">
                    <span>{sesion?.nombre || sesion?.usuario}</span>
                    {sesion?.rol && <span className="role-tag">{sesion.rol}</span>}
                </div>
                <button onClick={cerrarSesion} className="btn-logout">
                    Salir
                </button>
            </div>
        </header>
    );
}