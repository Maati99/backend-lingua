let logger = require('../utils/winston-module');
let passport = require ('passport')
let { Strategy } = require ('passport-local')
let LocalStrategy = Strategy
let {listUser,saveUser,validatePassword} = require ('../utils/utilidades');
/* ------------------ PASSPORT -------------------- */


passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {

const { direccion } = req.body
const { nombre } = req.body
const { edad } = req.body
const { numero } = req.body
const { foto } = req.body

let usuarios = await listUser()
const usuario = usuarios.find(usuario => usuario.username == username)

    if (usuario) {
      return done((null, false))
   }

const user = {
      username,
      password,
      nombre,
      direccion,
      edad,
      numero,
      foto,
    }

  try{
    saveUser(username,password,nombre,direccion,edad,numero,foto)
   const info = await sendMail({
      to: cuentaDePrueba,
      subject: asunto,
      html: JSON.stringify(user)
    })
    console.log('usuario agregado!')
  }catch (error) {
      logger.error(`Error: ${error}`);
  }

    return done(null, user)
}));

passport.use('login', new LocalStrategy(async (username, password, done) => {

let usuarios = await listUser()
const user = usuarios.find(usuario => usuario.username == username)


  if (!user) {
    return done(null, false)
  }

  if (validatePassword(user.password, password)){
    return done(null, false)
  }

  return done(null, user);
}));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(async function (username, done) {
    let usuarios = await listUser()
    const usuario = usuarios.find(usuario => usuario.username == username)
    done(null, usuario);
});

/* --------- REGISTRO ---------- */

function registro (req, res){
    logger.info(`Ruta ${req.method} ${req.url} funcionando correctamente`)
    res.sendFile('/views/register.html', { root: '.' })
}

function errorRegistro (req, res) {
    logger.warn(`Falla ${req.method} ${req.url} el registrarse`)
    res.render('register-error');
}

/* --------- LOGIN ---------- */
function login (req, res) {
    logger.info(`Ruta ${req.method} ${req.url} funcionando correctamente`)
    res.sendFile('/views/login.html', { root: '.' })
}

function errorLogin (req, res) {
    logger.warn(`Falla ${req.method} ${req.url} al loguearse`)
    res.render('login-error');
}

/* --------- LOGOUT ---------- */
function logout (req, res) {
    logger.info(`Ruta ${req.method} ${req.url} funcionando correctamente`)
    const nombre = req.user?.username
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(__dirname + '/views/logout.hbs', { root: '.' }, { nombre })
                req.logout();
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
}

module.exports =  {
    registro,
    errorRegistro,
    login,
    errorLogin,
    logout
}