import React, {useEffect, useState} from "react";
import PlaceList from "../../components/Places/PlaceList/PlaceList";
import {useParams} from "react-router-dom";
import {useHttpClient} from "../../util/hooks/httpHook";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

const UserPlaces = (props) =>{
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const userId = useParams().userId;

    useEffect(()=>{
        const fetchPlaces = async () =>{
            try{
                const resData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
                setLoadedPlaces(resData.userPlaces);
            }catch(err){}
        };
        fetchPlaces();
    },[sendRequest, userId]);

    const deleteHandler = (dPlaceId) =>{
        setLoadedPlaces((prevPlaces)=>
            prevPlaces.filter((place)=>
                place.id !== dPlaceId
        ));
    };

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <div className="center"><LoadingSpinner /></div> }
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDelete={deleteHandler}/>}
        </React.Fragment>
    );
};

export default UserPlaces;