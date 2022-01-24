let express = require ('express');
let cors = require ('cors')
const router = express.Router();
let {mensajes} = require ('../daos/index.js')

router.use(express.json()); 
router.use(express.urlencoded({extended: true}));
router.use(cors());

router.get('/', (req,res) => {+
    mensajes.getAll().then(result => {
        res.send(result);
    })
})

router.post('/',(req,res)=>{
    let cuerpo = req.body;
    if(!cuerpo.user || !cuerpo.message) return res.send({status:"error", message:"Error al enviar el mensaje"});
    mensajes.registerMessage(cuerpo).then(result => {
        res.send(result);
    })
})


module.exports = router;