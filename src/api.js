export async function api(endpoint, opciones = {}) {
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