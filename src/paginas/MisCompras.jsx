import { Link } from 'react-router-dom';

export default function MisCompras() {
    return (
        <div className="page-section">
            <div className="page-header">
                <div>
                    <h2>Historial de Compras</h2>
                    <p className="text-muted">Consulta tus compras anteriores y reabre tus comprobantes</p>
                </div>
            </div>
            <div className="empty-card">
                <h3>Cascarón de Historial listo</h3>
                <p>Aquí listaremos las ventas del usuario con enlace directo a <Link to="/comprobante">/comprobante</Link>.</p>
            </div>
        </div>
    );
}