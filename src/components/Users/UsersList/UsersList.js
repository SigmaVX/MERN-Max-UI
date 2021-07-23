import React from "react";
import PropTypes from "prop-types";
import UsersItem from "../UserItem/UserItem";
import Card from "../../UI/Card/Card";
import './UsersList.css';

const UsersList = (props) =>{
    if(props.items.length === 0){
        return(
            <div className="center">
                <Card>
                    <h2>No Users Found</h2>
                </Card>
            </div>
        );
    }else{
        return(
            <ul className="users-list">
                {props.items.map((user, index)=>(
                    <UsersItem
                        key={index}
                        id={user.id}
                        image={user.image}
                        name={user.name}
                        placeCount={user.places.length}
                    />
                ))}
            </ul>
        );
    };
};

export default UsersList;
UsersList.propTypes = {
    items: PropTypes.array.isRequired
};