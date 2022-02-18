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
        <Link to={`/details`}>
            <div onClick={onGameClick} style={{zIndex:2}}>
                <img src={props.img} alt="videogame image" style={{ maxWidth: "300px", zIndex:1 }} />
                <p style={{zIndex:1}}>{`${props.num + 1}. ${props.name}`}</p>
                <p style={{zIndex:1}}>{props.genres}</p>
                <p style={{zIndex:1}}>{props.rating}</p>
            </div>
        </Link>
    );
}
