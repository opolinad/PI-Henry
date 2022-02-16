const { Router } = require('express');
const router = Router();
const {getAllVideogames, getVideogamesByName} = require("../utils/videogames");

router.route('/')
    .get(async(req,res)=>{
        const {name,gamesQty}=req.query;
        name?(games =await getVideogamesByName(name)):(games =await getAllVideogames(gamesQty));
        return res.send(games);

    })
module.exports = router;