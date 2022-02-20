require('dotenv').config();
const {API_KEY} = process.env;
const axios = require("axios");
const { Videogame, Genre } = require("../db")

const videogameDetail=async (id)=>{
    try {
        let result = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        let gameDetails={
            img:result.data.background_image,
            name:result.data.name,
            genres:result.data.genres.map(genre=>genre.name).join(" "),
            description: result.data.description_raw,
            released:result.data.released,
            rating:result.data.rating,
            platforms:result.data.parent_platforms.map(platform=>platform.platform.name).join(" ")
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