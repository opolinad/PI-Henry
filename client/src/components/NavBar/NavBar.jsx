import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getByName, setLoading } from "../../actions";
import "./NavBar.css";
import icon from "../../Images/icono.png";
export default function NavBar() {
    const [inp, setInput] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function onSearchClick() {
        dispatch(setLoading(true));
        navigate("/home");
        dispatch(getByName(inp));
    }
    function onEnterPress(e) {
        (e.code==="Enter" || e.code==="NumpadEnter") && onSearchClick();
    }
    return (
        <div id="navbar-container">
            <img id="img-icon" src={icon} alt="icon" />
            <div id="links-container">
                <Link to="/home"><span>Inicio</span></Link>
                <Link to="/create"><span>Añadir videojuego</span></Link>
            </div>
            <div id="searchbar" onSubmit={onSearchClick}>
                <input id="input-navbar" type="text" placeholder="Nombre del videojuego..." value={inp} onChange={({ target: { value } }) => setInput(value)} onKeyUp={onEnterPress}/>
                <span onClick={onSearchClick}>Buscar</span>
            </div>
        </div>
    );
}