require('dotenv').config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame, Genre } = require('../db')


const getAllVideogames = async (numGames = 100) => {
    try {
        let result = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        let games = [];
        games = [...await Videogame.findAll({ include: Genre }), ...result.data.results];
        for (let i = 0; i < Math.ceil(numGames / 20) - 1; i++) {
            result = await axios.get(result.data.next);
            games = [...games, ...result.data.results]
        }
        if (games.length !== numGames) {
            games = games.slice(0, numGames)
        }
        return games.map(game => ({
            id: game.id,
            name: game.name,
            img:game.background_image?game.background_image:"https://media.wired.com/photos/603847ccf322ee1eea0074d1/4:3/w_1800,h_1350,c_limit/wired-games-coding-blackness.jpg",
            genres: game.genres.map(genre => genre.name).join(" "),
            rating: game.rating,
            created: game.created ? game.created : false
        }))
    } catch (error) {
        console.log(error);
    }
}
const getVideogamesByName = async (name) => {
    try {
        let result=await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        let games = [...await Videogame.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }, include: Genre
        }), ...result.data.results];
          if (games.length>15){
              games=games.slice(0,15);
          }else if (!games.length){
              return "No se ha encontrado ningún juego que coincida con los parámetros de búsqueda"
          }
          return games.map(game=>({
              id:game.id,
              name:game.name,
              img:game.background_image?game.background_image:"https://media.wired.com/photos/603847ccf322ee1eea0074d1/4:3/w_1800,h_1350,c_limit/wired-games-coding-blackness.jpg",
              genres: game.genres.map(genre=>genre.name).join(" "),
              rating: game.rating
          }));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllVideogames,
    getVideogamesByName
}