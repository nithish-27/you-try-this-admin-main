let express = require('express');
let app = express();
let router = express();
let PORT = 200;

//Routes

router.get('/',(req,res)=>{
    res.render('../views/index')
})

module.exports = router