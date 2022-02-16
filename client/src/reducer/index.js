import {GET_ALL, GET_BY_GENRE, GET_BY_CONDITION, GET_DETAIL, GET_BY_NAME, GET_ALL_GENRES, ADD_VIDEOGAME} from "../actions";

const initialState = {
    videogames:[],
    genres:[],
    gameDetail:{}
}

function reducer (state=initialState, action){
    switch (action.type) {
        case GET_ALL:
            return {...state, videogames:action.payload};
        case GET_BY_GENRE:
            return {...state, videogames:action.payload};
        case GET_BY_CONDITION:
            return {...state, videogames:action.payload};
        case GET_DETAIL:
            return {...state, gameDetail:action.payload};
        case GET_BY_NAME:
            return {...state, videogames:action.payload};
        case GET_ALL_GENRES:
            return {...state, genres:action.payload};
        case ADD_VIDEOGAME:
            return {...state, videogames:action.payload};
        default:
            return state;
    }
}

export default reducer;