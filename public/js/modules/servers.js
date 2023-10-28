/**
 * Save server plugin data
 * @param name
 * @param token
 */
function serverSavePlugin(name, token) {
    return $.ajax({
        method: "POST",
        url: "/api/admin/settings/server",
        data: {
            method: "listener",
            name: name,
            secret_key: token
        }
    });
}

/**
 * Save server RCON data
 * @param name
 * @param host
 * @param port
 * @param password
 */
function serverSaveRCON(name, host, port, password) {
    return $.ajax({
        method: "POST",
        url: "/api/admin/settings/server",
        data: {
            method: "rcon",
            name: name,
            host: host,
            port: port,
            password: password
        }
    });
}

/**
 * Save server plugin data
 * @param id
 * @param name
 * @param token
 */
function serverUpdatePlugin(id, name, token) {
    return $.ajax({
        method: "PATCH",
        url: `/api/admin/settings/server`,
        data: {
            method: "listener",
            id: id,
            name: name,
            secret_key: token
        }
    });
}

/**
 * Save server RCON data
 * @param id
 * @param name
 * @param host
 * @param port
 * @param password
 */
function serverUpdateRCON(id, name, host, port, password) {
    return $.ajax({
        method: "PATCH",
        url: `/api/admin/settings/server`,
        data: {
            method: "rcon",
            id: id,
            name: name,
            host: host,
            port: port,
            password: password
        }
    });
}

/**
 * Delete a server
 * @param id - server id
 */
function serverDelete(id) {
    return $.ajax({
        method: "DELETE",
        url: `/api/admin/settings/server?id=${id}`
    });
}

/**
 * Check server connection
 * @param id - server id
 */
function serverCheck(id) {
    return $.ajax({
        method: "POST",
        url: `/api/admin/settings/servers/check/${id}`
    });
}

/**
 * Check server connection
 * @param id - server id
 */
function serverSMTPCheck(id) {
    return $.ajax({
        method: "POST",
        url: `/api/admin/settings/email/check`
    });
}
