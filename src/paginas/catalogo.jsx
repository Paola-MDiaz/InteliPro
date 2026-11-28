export default function Catalogo() {
    return (
        <div className="page-section">
            <div className="page-header">
                <div>
                    <h2>Catálogo de Productos</h2>
                    <p className="text-muted">Explora productos disponibles por sucursal y categoría</p>
                </div>
                <div className="toolbar-placeholder">Selector de Tienda + Buscador</div>
            </div>
            <div className="empty-card">
                <h3>Cascarón de Catálogo listo</h3>
                <p>Aquí renderizaremos FiltroCategorias y la cuadrícula de TarjetaProducto (Fase 2).</p>
            </div>
        </div>
    );
}