const { Router } = require('express');
const router = Router();
const {getAllGenres} = require("../utils/genres");

router.get('/',async (req,res)=>{
    let genres=await getAllGenres();
    res.status(200).send(genres);
})
module.exports = router;