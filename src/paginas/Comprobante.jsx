export default function Comprobante() {
    return (
        <div className="page-section">
            <div className="page-header">
                <div>
                    <h2>Comprobante de Venta</h2>
                    <p className="text-muted">Ticket electrónico generado</p>
                </div>
                <button className="btn-primary" style={{ width: 'auto' }} onClick={() => window.print()}>
                    Imprimir ticket
                </button>
            </div>
            <div className="empty-card">
                <h3>Cascarón de Ticket listo</h3>
                <p>Aquí mostraremos folio, fecha, tienda, cliente, ****last4, desglose y total.</p>
            </div>
        </div>
    );
}