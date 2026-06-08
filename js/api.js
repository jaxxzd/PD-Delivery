const BASE_URLS = "https://69b83d57ffbcd0286097a0a9.mockapi.io/api";

export async function get(resource, endpoint) {
    const resp = await fetch(`${BASE_URLS[resource]}/${endpoint}`);

    if (!resp.ok) {
        throw new Error(`GET error: ${resp.status}`);
    }

    return await resp.json();
}

export async function post(resource, endpoint, data) {
    const resp = await fetch(`${BASE_URLS[resource]}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!resp.ok) {
        throw new Error(`POST error: ${resp.status}`);
    }

    return await resp.json();
}

export async function put(resource, endpoint, data) {
    const resp = await fetch(`${BASE_URLS[resource]}/${endpoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!resp.ok) {
        throw new Error(`PUT error: ${resp.status}`);
    }

    return await resp.json();
}

export async function del(resource, endpoint) {
    const resp = await fetch(`${BASE_URLS[resource]}/${endpoint}`, {
        method: "DELETE"
    });

    if (!resp.ok) {
        throw new Error(`DELETE error: ${resp.status}`);
    }
}