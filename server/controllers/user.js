const OracleDB = require('oracledb')
const dbconfig = require('../db/config')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

async function create(req) {
    let con, result
    // consulta a ejecutar
    const insert_query = "INSERT INTO MIAP2.USUARIO(NOMBRE, APELLIDO, PAIS, FECHA_NAC," +
        "CORREO, CONTRA, FOTO, CREADO_EN) VALUES(" +
        ":nom, :ape, :pai, TO_DATE(:fec,'yyyy-mm-dd')," +
        ":cor, :pwd, :ft, :cre)"
    const select_query = "SELECT usuario_id FROM miap2.usuario where correo = :correo"
    // se encripta la contraseña
    const pwd = bcrypt.hashSync(req.pwd, 10)
    // datos a insertar
    const binds = [req.name, req.surname, req.country,
    req.date, req.email, pwd, req.photo, new Date()]
    try {
        con = await OracleDB.getConnection(dbconfig)
        await con.execute(insert_query, binds, { autoCommit: true })
        result = await con.execute(select_query, [req.email])
    } catch (err) {
        console.error(err)
        return { ok: false, err }
    } finally {
        if (con) {
            con.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    return { ok: true, id: result.rows[0][0] }
}

/**
 * Intenta crear un token utilizan el identificador del usuario
 * 
 * @param {*} req 
 */
async function login(req) {
    let con, result
    // consulta a ejecutar
    const query = "SELECT usuario_id, contra, esadmin, confirmado" +
        " FROM miap2.usuario " +
        " WHERE correo = :correo"
    // datos a insertar
    const binds = [req.email]
    try {
        con = await OracleDB.getConnection(dbconfig)
        result = await con.execute(query, binds, { autoCommit: true, maxRows: 1 })
    } catch (err) {
        console.error(err)
        return { ok: false, err }
    } finally {
        if (con) {
            con.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    if (result.rows.length == 1) {
        let confirmado = result.rows[0][3]
        let pwd = result.rows[0][1]
        if (confirmado === 1) {
            if (bcrypt.compareSync(req.pwd, pwd)) {
                let id = result.rows[0][0]
                let esAdmin = result.rows[0][2]
                let token = sign({ id, esAdmin },
                    'seed-de-dessarollo-miap2',
                    { expiresIn: '48h' })
                // Credenciales correctas y correo confirmado
                return { ok: true, token, esAdmin }
            }
        } else {
            // Usuario aún no está confirmado
            return { ok: false, status: 403 }
        }
    }
    // Correo o contraseña incorrecta
    return { ok: false, status: 401 }
}

/**
 * Recupera a un usuario por el id
 * 
 * @param {*} req 
 */
async function getById(req) {
    let con, result
    const query = "SELECT nombre, apellido, pais, fecha_nac, correo, foto " +
        "FROM USUARIO WHERE usuario_id = :id"
    const binds = [req.id]
    try {
        con = await OracleDB.getConnection(dbconfig)
        result = await con.execute(query, binds, { autoCommit: true, maxRows: 1 })
    } catch (error) {
        console.error(err)
        return { ok: false, err }
    } finally {
        if (con) {
            con.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    if (result.rows.length >= 1) {
        return {
            ok: true, result: {
                name: result.rows[0][0],
                surname: result.rows[0][1],
                country: result.rows[0][2],
                birthday: result.rows[0][3],
                email: result.rows[0][4],
                photo: result.rows[0][5]
            }
        }
    }
    return { ok: false }
}

async function update(req) {
    let con, result
    const query = "UPDATE miap2.usuario set nombre = :name, " +
        " apellido = :surname, fecha_nac = :bday, foto = :photo " +
        " WHERE usuario_id = :id"
    const binds = [req.name, req.surname, req.birthday, req.photo, req.id]
    try {
        con = await OracleDB.getConnection(dbconfig)
        result = await con.execute(query, binds, { autoCommit: true })
    } catch (err) {
        console.error(err)
        return { ok: false, err }
    } finally {
        if (con) {
            con.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    return { ok: true, result: result.rowsAffected }
}

async function updatePwd(req) {
    let con, result
    const query = "UPDATE miap2.usuario set contra = :pwd " +
        " WHERE usuario_id = :id"
    const pwd = bcrypt.hashSync(req.pwd, 10)
    const binds = [pwd, req.id]
    try {
        con = await OracleDB.getConnection(dbconfig)
        result = await con.execute(query, binds, { autoCommit: true })
    } catch (err) {
        console.error(err)
        return { ok: false, err }
    } finally {
        if (con) {
            con.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    return { ok: true, result: result.rowsAffected }
}

async function confirm(id) {
    let con, result
    const query = "UPDATE miap2.usuario set confirmado = 1 WHERE usuario_id = :id"
    try {
        con = await OracleDB.getConnection(dbconfig)
        result = await con.execute(query, [id], { autoCommit: true })
    } catch (err) {
        console.log(`en confirmar -> ${err}`);
        return { ok: false, err }
    } finally {
        if (con) {
            con.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    return { ok: true, result: result.rowsAffected }
}

module.exports = { create, login, getById, update, updatePwd, confirm }