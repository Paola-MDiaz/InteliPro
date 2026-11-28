import { createContext, useContext, useState } from 'react';

const CarritoContexto = createContext();

export function ProveedorCarrito({ children }) {
    const [items, setItems] = useState([]);
    const [tiendaSeleccionada, setTiendaSeleccionada] = useState('T1');
    const [ultimaVenta, setUltimaVenta] = useState(null);

    const agregarProducto = (producto) => {
        setItems((prev) => {
            const existente = prev.find((i) => i.id === producto.id);
            if (existente) {
                if (existente.cantidad >= producto.existencia) return prev;
                return prev.map((i) =>
                    i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
                );
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    const cambiarCantidad = (id, nuevaCantidad) => {
        if (nuevaCantidad <= 0) {
            setItems((prev) => prev.filter((i) => i.id !== id));
            return;
        }
        setItems((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, cantidad: Math.min(nuevaCantidad, i.existencia) } : i
            )
        );
    };

    const vaciarCarrito = () => setItems([]);

    const totalArticulos = items.reduce((acc, i) => acc + i.cantidad, 0);
    const subtotal = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
    const impuesto = +(subtotal * 0.043).toFixed(2);
    const total = +(subtotal + impuesto).toFixed(2);

    return (
        <CarritoContexto.Provider
            value={{
                items,
                tiendaSeleccionada,
                setTiendaSeleccionada,
                agregarProducto,
                cambiarCantidad,
                vaciarCarrito,
                totalArticulos,
                subtotal,
                impuesto,
                total,
                ultimaVenta,
                setUltimaVenta,
            }}
        >
            {children}
        </CarritoContexto.Provider>
    );
}

export const useCarrito = () => useContext(CarritoContexto);