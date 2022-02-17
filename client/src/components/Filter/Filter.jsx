// género, existente -- ordenar por alfabetico o rating -- juegos por página
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {getAllVideogames, getByCondition, getByGenre, orderArray } from '../../actions';

export default function Filter (props){
    const genres = useSelector((state)=>state.genres);
    const dispatch = useDispatch();
    const gamesToShow=props.gamesToShow;
    function onRadioChange(e){
        switch (e.target.value) {
            case "all":
                dispatch(getAllVideogames(gamesToShow));
                break;
            case "created":
                dispatch(getByCondition("created"));
                break;
            case "existing":
                dispatch(getByCondition("existing"));
                break;
        }
    }
    function onSortChange(e){
        dispatch(orderArray(e.target.value));
    }
    function onGenreChange(e){
        dispatch(getByGenre(e.target.value));
    }
    function onGamesQtyChange(e){
        props.modifyGamesToShow(e.target.value);
    }
    function onResultsPerPageChange(e){
        props.modifyResultsPerPageChange(e.target.value);
    }
    return(
        <div>
            <div>
                <input type="radio" name="filter-created" value="all" id="all" onChange={(e)=>onRadioChange(e)}/>
                <label htmlFor="all">Todos</label>
                <input type="radio" name="filter-created" value="created" id="created" onChange={(e)=>onRadioChange(e)}/>
                <label htmlFor="created">Creados</label>
                <input type="radio" name="filter-created" value="existing" id="existing" onChange={(e)=>onRadioChange(e)}/>
                <label htmlFor="existing">Existentes</label>
            </div>
            <label htmlFor="filter-genres">Filtar por género:</label>
            <select id="filter-genres" onChange={onGenreChange}>
                <option value="seleccionar">Seleccionar género</option>
                {genres.map((genre, index)=> <option key={index} value={genre}>{genre}</option>)}
            </select>
            <label htmlFor="order">Ordenar por:</label>
            <select id="order" onChange={onSortChange}>
                <option value="orderBy">Seleccione</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="rating-asc">Rating 0-5</option>
                <option value="rating-des">Rating 5-0</option>
            </select>
            <label htmlFor="results-page">Resultados por página:</label>
            <select id="results-page"  value={15} onChange={onResultsPerPageChange}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
            </select>
            <label htmlFor="games-quantity">Número de juegos para mostrar</label>
            <input type="text" id="games-quantity" value={gamesToShow} onChange={onGamesQtyChange}/>
        </div>
    );
}