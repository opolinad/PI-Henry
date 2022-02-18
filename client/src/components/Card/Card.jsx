import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../../actions";

export default function Card(props) {
    const dispatch=useDispatch();
    function onGameClick(e) {
        dispatch(getDetail(props.id));
    }
    return (
        // <Link to={`/details/${props.name}`}>
            <div onClick={onGameClick}>
                <img src={props.img} alt="videogame image" style={{ maxWidth: "300px" }} />
                <p>{`${props.num + 1}. ${props.name}`}</p>
                <p>{props.genres}</p>
                <p>{props.rating}</p>
            </div>
        // </Link>
    );
}
