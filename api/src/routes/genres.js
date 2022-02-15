const { Router } = require('express');
const router = Router();
const {getAllGenres} = require("../utils/genres");

router.get('/',async (req,res)=>{
    await getAllGenres();
    res.sendStatus(200);
})
module.exports = router;