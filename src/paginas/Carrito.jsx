import { Link } from 'react-router-dom';
import { useCarrito } from '../estado/carrito';

export default function Carrito() {
    const { items, subtotal, impuesto, total } = useCarrito();

    return (
        <div className="page-section">
            <div className="page-header">
                <div>
                    <h2>Carrito de Compras</h2>
                    <p className="text-muted">Revisa tus artículos antes de procesar el pago</p>
                </div>
                <Link to="/pago" className="btn-primary" style={{ width: 'auto', textDecoration: 'none' }}>
                    Continuar al pago →
                </Link>
            </div>
            <div className="empty-card">
                <h3>Artículos en carrito: {items.length}</h3>
                <p>Subtotal: ${subtotal.toFixed(2)} MXN · Impuesto (4.3%): ${impuesto.toFixed(2)} MXN · Total: ${total.toFixed(2)} MXN</p>
            </div>
        </div>
    );
}