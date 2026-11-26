import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ sesion, rutaRequerida, children }) {
    if (!sesion) {
        return <Navigate to="/login" replace />;
    }

    const permisos = sesion.permisos || sesion.rutas || [];
    if (rutaRequerida && permisos.length > 0 && !permisos.includes(rutaRequerida)) {
        return <Navigate to={sesion.inicio || '/catalogo'} replace />;
    }

    return children;
}