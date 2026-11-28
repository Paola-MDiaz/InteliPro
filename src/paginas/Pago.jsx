import { Link } from 'react-router-dom';

export default function Pago() {
    return (
        <div className="page-section">
            <div className="page-header">
                <div>
                    <h2>Pago con Tarjeta</h2>
                    <p className="text-muted">Pasarela simulada de pago seguro</p>
                </div>
                <Link to="/comprobante" className="btn-primary" style={{ width: 'auto', textDecoration: 'none' }}>
                    Simular confirmación →
                </Link>
            </div>
            <div className="empty-card">
                <h3>Cascarón de Pago listo</h3>
                <p>Aquí irá la barra PasosCompra y el formulario de tarjeta con validación Luhn.</p>
            </div>
        </div>
    );
}