import axios from "axios";
export const GET_ALL="GET_ALL";
export const GET_BY_GENRE="GET_BY_GENRE";
export const GET_BY_CONDITION="GET_DB";
export const GET_DETAIL="GET_DETAIL";
export const GET_BY_NAME="GET_BY_NAME";
export const GET_ALL_GENRES="GET_ALL_GENRES";
export const ADD_VIDEOGAME="ADD_VIDEOGAME";
export const ORDER="ORDER";


export  function getAllVideogames (gamesQty){
    return async (dispatch)=>{
        let url=gamesQty?`http://localhost:3001/videogames?gamesQty=${gamesQty}`:`http://localhost:3001/videogames`
        let games = await axios.get(url);
        return dispatch({type:GET_ALL, payload:games.data})
    }
}

export function getByGenre (genre){
    return {type:GET_BY_GENRE, payload:genre};
}
export function getByCondition (condition){
    return {type:GET_BY_CONDITION, payload:condition};
}

export function getDetail (id){
    return async (dispatch)=>{
        let gameDetail = await axios.get(`http://localhost:3001/videogame/${id}`);
        return dispatch({type:GET_DETAIL, payload:gameDetail.data})
    }
}
export function getByName (name){
    return async (dispatch)=>{
        let games = await axios.get(`http://localhost:3001/videogames/${name}`);
        return dispatch({type:GET_BY_NAME, payload:games.data})
    }
}
export function getAllGenres (){
    return async (dispatch)=>{
        let genres = await axios.get(`http://localhost:3001/genres`);
        return dispatch({type:GET_ALL_GENRES, payload:genres.data})
    }
}
export function addVideogame (name, description, released, rating, genres, platforms){
    return async (dispatch)=>{
        let opt={
            data:{
                name,
                description,
                released,
                rating,
                genres,
                platforms
            }
        }
        let response = await axios.post(`http://localhost:3001/videogame/`,opt);
        getAllVideogames();
        return dispatch({type:ADD_VIDEOGAME, payload:response.data})
    }
}
export function orderArray (condition){
    return {type:ORDER, payload:condition}
}