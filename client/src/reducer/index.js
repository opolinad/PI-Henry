import { GET_ALL, GET_BY_GENRE, GET_BY_CONDITION, GET_DETAIL, GET_BY_NAME, GET_ALL_GENRES, ADD_VIDEOGAME, ORDER, LOADING } from "../actions";

const initialState = {
    videogames: [],
    videogamesFilter: [],
    genres: [],
    gameDetail: {},
    loading:false
}

function reducer(state = initialState, action) {
    let data;
    let arr;
    switch (action.type) {
        case GET_ALL:
            return { ...state, videogames: [...action.payload], videogamesFilter: [...action.payload] };
        case GET_BY_GENRE:
            arr = state.videogames !== state.videogamesFilter ? state.videogamesFilter : state.videogames;
            data = action.payload ? arr.filter(game => game.genres.includes(action.payload)) : state.videogames;
            var prueba = { ...state, videogamesFilter: data };
            return prueba;

        case GET_BY_CONDITION:
            data = action.payload === "all" ?
                state.videogames :
                (action.payload === "created" ?
                    state.videogames.filter(game => game.created) :
                    state.videogames.filter(game => !game.created));
            return { ...state, videogamesFilter: data };
        case GET_DETAIL:
            return { ...state, gameDetail: action.payload };
        case GET_BY_NAME:
            return { ...state, videogames: action.payload, videogamesFilter: action.payload };
        case GET_ALL_GENRES:
            return { ...state, genres: action.payload };
        case ADD_VIDEOGAME:
            return { ...state };
        case ORDER:
            arr = state.videogames !== state.videogamesFilter ? state.videogamesFilter : state.videogames;
            switch (action.payload) {
                case "a-z":
                    arr.sort((a, b) => {
                        let nameA = a.name.toUpperCase();
                        let nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    })
                    break;
                case "z-a":
                    arr.sort((a, b) => {
                        let nameA = a.name.toUpperCase();
                        let nameB = b.name.toUpperCase();
                        if (nameA > nameB) {
                            return -1;
                        }
                        if (nameA < nameB) {
                            return 1;
                        }
                        return 0;
                    })
                    break;
                case "rating-asc":
                    arr.sort((a, b) => a.rating - b.rating)
                    break;
                case "rating-des":
                    arr.sort((a, b) => b.rating - a.rating)
                    break;
            }
            return { ...state, videogamesFilter: arr };
        case LOADING:
            return {...state, loading:action.payload};
        default:
            return state;
    }
}
export default reducer;