const rol = (req, res, next) => {

    let admin = req.headers['admin'] || 'false';

    if(admin === 'false'){
        return res.status(403).json({
            error:-1,
            description: `Ruta ${req.baseUrl} método ${req.method} no autorizada`
        });
    }else{
        next();
    }
}

module.exports = { rol };