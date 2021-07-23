import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import ImageUpload from "../../components/UI/ImageUpload/ImageUpload";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import {useHttpClient} from "../../util/hooks/httpHook";
import {useForm} from "../../util/hooks/formHook";
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from "../../util/validators";
import {AuthContext} from "../../context/AuthContext/AuthContext";
import "./NewPlace.css";

const NewPlace = (props) =>{
    // History Routing
    const history = useHistory();
    // Context Hook For User Id Info
    const auth = useContext(AuthContext);
    // Custom Hook - for HTTP
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    // Custom Hook - param for init state and isValid
    const [formState, inputHandler] = useForm(
        {
            title:{
                value: "",
                isValid: false
            },
            address:{
                value: "",
                isValid: false
            },
            description:{
                value: "",
                isValid: false
            },
            image: {
                value: null,
                isValid: false
            }
        }, false
    );
    const submitHandler = async (event) =>{
        event.preventDefault();
        try{
            const formData = new FormData();
            formData.append("title", formState.inputs.title.value);
            formData.append("description", formState.inputs.description.value);
            formData.append("address", formState.inputs.address.value);
            formData.append("image", formState.inputs.image.value);
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/places",
                "POST",
                formData,
                {Authorization: "Bearer " + auth.token}
            );
            history.push("/");
        }catch(err){}
    };

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <form className="place-form" onSubmit={submitHandler}>
                <h2 className="center">Add A New Place</h2>
                {isLoading && <LoadingSpinner asOverlay />}
                <ImageUpload
                    center
                    id="image"
                    onInput={inputHandler}
                    errorText=""
                />
                <Input
                    element="input"
                    id="title"
                    label="Title"
                    type="text"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Title"
                    onInput={inputHandler}
                />
                <Input
                    element="text"
                    id="description"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please Enter A Valid Descriptoin - Min Five Characters"
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="address"
                    label="Address"
                    type="text"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please Enter A Valid Address"
                    onInput={inputHandler}
                />
                <div className="center">
                <Button type="submit" disabled={!formState.isValid} >Add Place</Button>

                </div>
            </form>
        </React.Fragment>
    );
};

export default NewPlace;
