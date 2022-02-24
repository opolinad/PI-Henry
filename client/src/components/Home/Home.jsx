import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllVideogames, getAllGenres, setLoading } from "../../actions"
import Card from "../Card/Card";
import Filter from "../Filter/Filter";
import NavBar from "../NavBar/NavBar";
import Pages from "../Pages/Pages";
import loadingGif from "../../Images/Yoda animation.gif"
import "./Home.css";

export default function Home() {
    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogamesFilter);
    const loading = useSelector((state=>state.loading));
    const [gamesToShow, setGamesToShow] = useState(100);
    const [resultsPerPage, setResultsPerPage] = useState(15);
    const [actualPage, setActualPage] = useState(1);
    const [ordered, setOrdered] = useState(false);
    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(getAllGenres());
        dispatch(getAllVideogames(gamesToShow));
        setOrdered(false);
    }, [gamesToShow, resultsPerPage])
    function modifyGamesToShow(games) {
        setGamesToShow(games);
    }
    function modifyResultsPerPage(results) {
        setResultsPerPage(results);
    }
    function modifyActualPage(page) {
        setActualPage(page);
    }
    function modifyOrdered() {
        setOrdered(!ordered);
    }
    return (
        <div id="home-container">
            <NavBar />
            <Filter modifyGamesToShow={modifyGamesToShow} modifyResultsPerPage={modifyResultsPerPage} gamesToShow={gamesToShow} resultsPerPage={resultsPerPage} modifyActualPage={modifyActualPage} modifyOrdered={modifyOrdered} />

            <div id="cards-container">
                {loading && <img id="img-loading" src={loadingGif}/>}
                {loading && <p id="p-loading">Yoda está cargando la información</p>}
                {!loading && videogames.slice((actualPage - 1) * resultsPerPage, (actualPage - 1) * resultsPerPage + resultsPerPage).map((game, index) => <Card key={index} num={index + (actualPage - 1) * resultsPerPage} id={game.id} name={game.name} img={game.img} genres={game.genres} rating={game.rating} />)}
            </div>

            <Pages resultsPerPage={resultsPerPage} modifyActualPage={modifyActualPage} actualPage={actualPage}/>
        </div>
    );
}