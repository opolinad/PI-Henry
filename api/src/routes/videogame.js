const { Router } = require('express');
const router = Router();
const {videogameDetail, createVideogame} = require("../utils/videogame");

    router.get('/:idVideogame',async (req,res)=>{
        const {idVideogame}=req.params;
        let vgDetail = await videogameDetail(idVideogame);
        vgDetail?res.send(vgDetail):res.send({msg:"El videojuego no se encontró"});
    })
    router.post("/",(req,res)=>{
        const {name, description, released, rating, genres, platforms}=req.body;
        if(!name || !description || !released || (!rating && rating!==0) || !genres || !platforms) return res.status(400).send("Uno o más de los argumentos necesarios para crear la entrada del videojuego no han sido provistos");
        createVideogame(name, description, released, rating, genres, platforms);
        res.status(201).send(`El videojuego ${name} ha sido creado con éxito`)
    })

    module.exports = router;