import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail, setLoading } from "../../actions";
import "./Card.css";

export default function Card(props) {
    const dispatch=useDispatch();
    return (
        <Link to={`/details/${props.id}`}>
            <div id="card-container">
                <img src={props.img} alt="videogame image" />
                <p>{`${props.num + 1}. ${props.name}`}</p>
                <p>{`Géneros: ${props.genres}`}</p>
                <p>{`Rating: ${props.rating}`}</p>
            </div>
        </Link>
    );
}
