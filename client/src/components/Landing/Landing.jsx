import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function LandingPage() {
    return (
        <div id="div-container">
            {/* <img id="img-main" src={mainImage} /> */}
            <h1>Info games</h1>
            <p>El lugar donde puedes encontrar</p>
            <p>toda la información sobre los videojuegos</p>
            <Link to="/home">
                <a id="btn-getin">EMPEZAR</a>
            </Link>
        </div>
    );
}