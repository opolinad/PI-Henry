// falta hacer la verificación de un filtro sobre otro
import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllVideogames, getByCondition, getByGenre, orderArray } from '../../actions';

export default function Filter(props) {
    const genres = useSelector((state) => state.genres);
    const dispatch = useDispatch();
    const [filtered, setFiltered] = useState({
        created: "all",
        genre: "all",
        sort: "all"
    });
    const gamesToShow = props.gamesToShow;
    const resultsPerPage = props.resultsPerPage;
    function onRadioChange(e) {
        setFiltered({ ...filtered, created: e.target.value });
        props.modifyActualPage(1);
        if (filtered.genre !== "all") {
            dispatch(getByCondition(e.target.value));
            dispatch(getByGenre(filtered.genre));
        } else {
            dispatch(getByCondition(e.target.value));
        }
    }
    function onGenreChange(e) {
        setFiltered({ ...filtered, genre: e.target.value });
        props.modifyActualPage(1);
        if (filtered.genre !== "all") {
            dispatch(getByCondition(filtered.created));
            dispatch(getByGenre(e.target.value));
        } else if (filtered.sort !== "all") {
            dispatch(getByGenre(e.target.value));
            dispatch(orderArray(filtered.sort));
        } else {
            dispatch(getByGenre(e.target.value));
        }
    }
    function onSortChange(e) {
        setFiltered({ ...filtered, sort: e.target.value });
        dispatch(orderArray(e.target.value));
        props.modifyOrdered();
    }
    function onGamesQtyChange(e) {
        props.modifyActualPage(1);
        props.modifyGamesToShow(e.target.value);
        onDeleteFiltersClick();
    }
    function onResultsPerPageChange(e) {
        props.modifyActualPage(1);
        props.modifyResultsPerPage(e.target.value);
        onDeleteFiltersClick();
    }
    function onDeleteFiltersClick() {
        setFiltered({
            created: "all",
            genre: "all",
            sort: "all"
        });
        dispatch(getByCondition("all"));
        for (const button of document.getElementsByName("filter-created")) {
            button.checked = false;
        }
        document.getElementById("filter-genres").value = "seleccionar";
        document.getElementById("order").value = "orderBy";

    }
    return (
        <div>
            <div>
                <input type="radio" name="filter-created" value="all" id="all" onChange={(e) => onRadioChange(e)} />
                <label htmlFor="all">Todos</label>
                <input type="radio" name="filter-created" value="created" id="created" onChange={(e) => onRadioChange(e)} />
                <label htmlFor="created">Creados</label>
                <input type="radio" name="filter-created" value="existing" id="existing" onChange={(e) => onRadioChange(e)} />
                <label htmlFor="existing">Existentes</label>
            </div>
            <label htmlFor="filter-genres">Filtar por género:</label>
            <select id="filter-genres" onChange={onGenreChange}>
                <option value="seleccionar">Seleccionar género</option>
                {genres.map((genre, index) => <option key={index} value={genre}>{genre}</option>)}
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
            <select id="results-page" value={resultsPerPage} onChange={onResultsPerPageChange}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
            </select>
            <label htmlFor="games-quantity">Número de juegos para mostrar</label>
            <input type="text" id="games-quantity" value={gamesToShow} onChange={onGamesQtyChange} />
            <button onClick={onDeleteFiltersClick}>Borrar filtros</button>
        </div>
    );
}