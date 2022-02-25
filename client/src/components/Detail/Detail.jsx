import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import loadingGif from "../../Images/Yoda animation.gif"
import notFoundGif from "../../Images/Mario not found.gif"
import "./Detail.css";
import { useParams } from "react-router-dom";
import { getDetail, setLoading } from "../../actions";

export default function Detail() {
    const detail = useSelector((state) => state.gameDetail);
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    let { idJuego } = useParams();
    if (detail.hasOwnProperty("msg")) {
        return (<div id="detail-container">
            <NavBar />
            <img id="img-not-found-detail" src={notFoundGif} />
            <p id="p-not-found-detail">No se ha encontrado ningún juego que coincida con los parámetros de búsqueda</p>
        </div>);
    } else if (!detail.name) {
        dispatch(setLoading(true));
        dispatch(getDetail(idJuego));
    }
    if (loading) {
        return (<div id="detail-container">
            <NavBar />
            <img id="img-loading-detail" src={loadingGif} />
            <p id="p-loading-detail">Yoda está cargando la información</p>
        </div>);
    }
    return (<div id="detail-container">
        <NavBar />
        <div id="detail-wraper">
            <div id="detail-img">
                <img src={detail.img} alt="videogame image" />
            </div>
            <h1>{detail.name}</h1>
            <p>Géneros:</p>
            <p>{detail.genres}</p>
            <p>Plataformas:</p>
            <p>{detail.platforms}</p>
            <p>Fecha de lanzamiento:</p>
            <p>{detail.released}</p>
            <p>Rating:</p>
            <p>{detail.rating}</p>
            <p><a href={`https://www.google.com/search?q=${detail.name}&tbm=shop`} target="_blank"> Dónde comprar</a></p>
            <p>Descripción</p>
            <p>{detail.description}</p>
        </div>
    </div>);
}