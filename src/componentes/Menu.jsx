import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Menu({ sesion, onLogout }) {
    const navigate = useNavigate();
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
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ddd' }}>
            <strong>InteliPro</strong>
            {tienePermiso('/catalogo') && <Link to="/catalogo">Catálogo</Link>}
            {tienePermiso('/carrito') && <Link to="/carrito">Carrito</Link>}
            {tienePermiso('/mis-compras') && <Link to="/mis-compras">Mis compras</Link>}
            {tienePermiso('/dashboard') && <Link to="/dashboard">Dashboard</Link>}
            <span style={{ marginLeft: 'auto' }}>
                {sesion?.nombre || sesion?.usuario} ({sesion?.rol})
            </span>
            <button onClick={cerrarSesion}>Salir</button>
        </nav>
    );
}