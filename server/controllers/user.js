const OracleDB = require('oracledb')
const dbconfig = require('../db/config')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

async function create(req) {
    let con
    // consulta a ejecutar
    const query = "INSERT INTO MIAP2.USUARIO(NOMBRE, APELLIDO, PAIS, FECHA_NAC," +
        "CORREO, CONTRA, FOTO, CREADO_EN) VALUES(" +
        ":nom, :ape, :pai, TO_DATE(:fec,'yyyy-mm-dd')," +
        ":cor, :pwd, :ft, :cre)"
    // se encripta la contraseña
    const pwd = bcrypt.hashSync(req.pwd, 10)
    // datos a insertar
    const binds = [req.name, req.surname, req.country,
    req.date, req.email, pwd, req.photo, new Date()]
    try {
        con = await OracleDB.getConnection(dbconfig)
        await con.execute(query, binds,{autoCommit: true})
    } catch (err) {
        console.error(err)
        return {ok:false, err}
    } finally {
        if (con) {
            con.release((err)=> {
                if(err) {
                    console.error(err)
                }
            })
        }
    }
    return {ok: true}
}

async function login(req) {
    let con, result
    // consulta a ejecutar
    const query = "SELECT usuario_id, contra" +
    " FROM miap2.usuario " +
    " WHERE correo = :correo"
    // se encripta la contraseña
    const pwd = bcrypt.hashSync(req.pwd, 10)
    // datos a insertar
    const binds = [req.email]
    try {
        con = await OracleDB.getConnection(dbconfig)
        result = await con.execute(query, binds,{autoCommit: true, maxRows: 1})
    } catch (err) {
        console.error(err)
        return {ok:false, err}
    } finally {
        if (con) {
            con.release((err)=> {
                if(err) {
                    console.error(err)
                }
            })
        }
    }
    if(result.rows.length == 1){
        if(bcrypt.compareSync(req.pwd, result.rows[0][1])) {
            let token = sign({id:result.rows[0][0]},process.env.JWT_SEED, {expiresIn:'48h'}) 
            return {ok: true, token}
        } else {
            return {ok: false}
        }
    }
    return {ok: false}
}

module.exports = { create ,login}