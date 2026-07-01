const BASE_URLS = "https://6a207fbfe96c1d13b5878397.mockapi.io";

export async function get(endpoint) {
    const resp = await fetch(`${BASE_URLS}/${endpoint}`);

    if (!resp.ok) {
        throw new Error(`GET error: ${resp.status}. Autenticação indisponível, tente mais tarde`);
    }

    return await resp.json();
}

export async function post(endpoint, data) {
    const resp = await fetch(`${BASE_URLS}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!resp.ok) {
        throw new Error(`POST error: ${resp.status}. Autenticação indisponível, tente mais tarde`);
    }

    return await resp.json();
}

export async function put(endpoint, data) {
    const resp = await fetch(`${BASE_URLS}/${endpoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!resp.ok) {
        throw new Error(`PUT error: ${resp.status}. Autenticação indisponível, tente mais tarde`);
    }

    return await resp.json();
}

export async function del(endpoint) {
    const resp = await fetch(`${BASE_URLS}/${endpoint}`, {
        method: "DELETE"
    });

    if (!resp.ok) {
        throw new Error(`DELETE error: ${resp.status}. Autenticação indisponível, tente mais tarde`);
    }
}