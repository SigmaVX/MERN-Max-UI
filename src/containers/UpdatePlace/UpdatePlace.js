import React, { useEffect, useState, useContext } from "react";
import {useParams, useHistory} from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import {useForm} from "../../util/hooks/formHook";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import {useHttpClient} from "../../util/hooks/httpHook";
import {AuthContext} from "../../context/AuthContext/AuthContext";
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../util/validators";

const UpdatePlace = (props) =>{
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();
    const auth = useContext(AuthContext);
    const placeId = useParams().placeId;
    const history = useHistory();
    const [formState, inputHandler, setFormData] = useForm({
        title:{
            value: "",
            isValid: false
        },
        description:{
            value: "",
            isValid: false
        }
    }, false);

    useEffect(()=>{
        const fetchPlace = async ()=>{
            try{
                const resData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
                setLoadedPlace(resData.place);
                setFormData({
                    title:{
                        value: resData.place.title,
                        isValid: true
                    },
                    description:{
                        value: resData.place.description,
                        isValid: true
                    }
                },true);
            }catch(err){}
        };
        fetchPlace();
    }, [sendRequest, placeId, setFormData]);

    const submitHandler = async (event) =>{
        event.preventDefault();
        try{
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
                "PATCH",
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {"Content-Type": "application/json", "Authorization": "Bearer " + auth.token}
            );
            history.push(`/${auth.userId}/places`);
        }catch(err){}
    };

    if(isLoading){
        return(
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    };

    if(!loadedPlace && !error){
        return(
            <div className="center">
                <Card>
                    <h2>Could Not Find Place</h2>
                </Card>
            </div>
        );
    };

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace &&
            <form className="place-form" onSubmit={submitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Title"
                    onInput={inputHandler}
                    initialValue={loadedPlace.title}
                    initialValid={true}
                />
                <Input
                    id="textarea"
                    element="description"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please Enter A Valid Description - Min Five Characters"
                    onInput={inputHandler}
                    initialValue={loadedPlace.description}
                    initialValid={true}
                />
                <Button type="submit" disabled={!formState.isValid}>Update Place</Button>
            </form>}
        </React.Fragment>
    );
};

export default UpdatePlace;