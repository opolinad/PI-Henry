require('dotenv').config();
const {API_KEY} = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../db")

const videogameDetail=async (id)=>{
    try {
        let result = id.length<10?
        await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`):
        await Videogame.findByPk(id,{include:Genre});
        let gameDetails={
            img:result.data?result.data.background_image:result.dataValues.img,
            name:result.data?result.data.name:result.dataValues.name,
            genres:result.data?result.data.genres.map(genre=>genre.name).join(" "):result.dataValues.genres.map(genre=>genre.dataValues.name).join(" "),
            description: result.data?result.data.description_raw:result.dataValues.description,
            released:result.data?result.data.released:result.dataValues.released,
            rating:result.data?result.data.rating:result.dataValues.rating,
            platforms:result.data?result.data.parent_platforms.map(platform=>platform.platform.name).join(" "):result.dataValues.platforms
        }
        return gameDetails;
    } catch (error) {
        console.log(error);
    }
}

const createVideogame = async (name, description, released, rating, genres, platforms, img)=>{
    const game = await Videogame.findOrCreate({
        where:{
            name,
            description,
            released,
            rating,
            platforms,
            img
        }
    });
    genres.map(genre=>game[0].addGenres(genre));
}

module.exports={
    videogameDetail,
    createVideogame
}