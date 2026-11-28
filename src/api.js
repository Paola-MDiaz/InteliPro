// Cambia a false cuando el servidor de Persona A ya esté corriendo en el puerto 3000
export const MODO_PRUEBA = true;

const USUARIOS_PRUEBA = {
    cliente: {
        nombre: 'Pau (Cliente)',
        usuario: 'cliente_demo',
        rol: 'cliente',
        inicio: '/catalogo',
        permisos: ['/catalogo', '/carrito', '/pago', '/comprobante', '/mis-compras'],
    },
    vendedor: {
        nombre: 'Vendedor 02',
        usuario: 'vendedor_02',
        rol: 'vendedor',
        inicio: '/catalogo',
        permisos: ['/catalogo', '/carrito', '/pago', '/comprobante', '/mis-compras', '/dashboard'],
    },
    gerente: {
        nombre: 'Gerente Tienda 1',
        usuario: 'gerente_t1',
        rol: 'gerente',
        idTienda: 'T1',
        inicio: '/dashboard',
        permisos: ['/catalogo', '/mis-compras', '/dashboard'],
    },
    admin: {
        nombre: 'Admin 13',
        usuario: 'admin_13',
        rol: 'administrativo',
        inicio: '/dashboard',
        permisos: ['/catalogo', '/carrito', '/pago', '/comprobante', '/mis-compras', '/dashboard'],
    },
};

export async function api(endpoint, opciones = {}) {
    if (MODO_PRUEBA) {
        await new Promise((r) => setTimeout(r, 200)); // Simula tiempo de respuesta de red

        if (endpoint === '/auth/login') {
            const { usuario } = JSON.parse(opciones.body || '{}');
            const clave = Object.keys(USUARIOS_PRUEBA).find((k) =>
                usuario.toLowerCase().includes(k)
            ) || 'cliente';
            const sesion = USUARIOS_PRUEBA[clave];
            localStorage.setItem('sesion_prueba', JSON.stringify(sesion));
            return { usuario: sesion, inicio: sesion.inicio };
        }

        if (endpoint === '/auth/yo') {
            const guardada = localStorage.getItem('sesion_prueba');
            if (!guardada) throw new Error('Sin sesión activa');
            return { usuario: JSON.parse(guardada) };
        }

        if (endpoint === '/auth/logout') {
            localStorage.removeItem('sesion_prueba');
            return { ok: true };
        }
    }

    // Llamada real al backend de Persona A cuando MODO_PRUEBA = false
    const respuesta = await fetch(`/api${endpoint}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(opciones.headers || {}),
        },
        ...opciones,
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || datos.error || `Error ${respuesta.status}`);
    }

    return datos;
}