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
            img:result.data?result.data.background_image:"https://media.wired.com/photos/603847ccf322ee1eea0074d1/4:3/w_1800,h_1350,c_limit/wired-games-coding-blackness.jpg",
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

const createVideogame = async (name, description, released, rating, genres, platforms)=>{
    const game = await Videogame.findOrCreate({
        where:{
            name,
            description,
            released,
            rating,
            platforms
        }
    });
    genres.map(genre=>game[0].addGenres(genre));
}

module.exports={
    videogameDetail,
    createVideogame
}