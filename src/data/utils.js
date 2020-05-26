// Función para conectar a una api, similar a axios pero de creación propia de mi empresa
function api_get(url, method = "GET", data = {}) {
    var publicAPI = function (xhr) {
        xhr.withCredentials = false;
    }
    return m.request({
        method: method,
        url: url,
        config: publicAPI,
        body: data
        // extract: nonJsonErrors
    })
}

// Función que localiza los objetos dentro de un objeto y se trae la información en string, módulo de mi empresa
function localize(object, lang = "es") {
    if (typeof object !== "object") return object;
    if (Object.entries(object).length === 0) return null;
    var resp = object[lang] || object["und"] || Object.values(object)[0] || object;
    if (typeof resp === "string")
        return resp;
    return '';
}

// Función para capturar la clase de un icono para reutilizar.
var Icono = {
    view: (vnode) => {
        //console.log(vnode)
        let clase = vnode.attrs.class || '';
        return m(`i.icon.${clase}`);
    }
}

export {
    api_get, localize, Icono
}