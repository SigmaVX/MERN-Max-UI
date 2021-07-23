import React from "react";
import PropTypes from "prop-types";
import Avatar from "../../UI/Avatar/Avatar";
import Card from "../../UI/Card/Card";
import { Link } from "react-router-dom";
import "./UserItem.css";

const UserItem = (props) =>{
    return(
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${props.id}/places`}>
                    <div className="user-item__image">
                        <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.name} />
                    </div>
                    <div className="user-item__info">
                        <h2>{props.name}</h2>
                        <h3>{props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}</h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
UserItem.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeCount: PropTypes.number.isRequired
};