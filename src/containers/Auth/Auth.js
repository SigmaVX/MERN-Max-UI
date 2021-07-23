import React, {useState, useContext} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import ImageUpload from "../../components/UI/ImageUpload/ImageUpload";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import {AuthContext} from "../../context/AuthContext/AuthContext";
import {useForm} from "../../util/hooks/formHook";
import {useHttpClient} from "../../util/hooks/httpHook";
import {VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH} from "../../util/validators";
import "./Auth.css";

// Spend time evaluating form hook and state management on forms

const Auth =(props)=>{
    const authData = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
        {
            email:{
                value: "",
                isValid: false
            },
            password:{
                value: "",
                isValid: false
            }
        }, false
    );

    const submitHandler = async (event) =>{
        event.preventDefault();
        // console.log(formState.inputs);
        if(isLoginMode){
            try{
                const resData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/users/login",
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {"Content-Type": "application/json"},
                );
                authData.login(resData.userId, resData.token);
            }catch(err){};
        }else{
            try{
                const formData = new FormData();
                formData.append("name", formState.inputs.name.value);
                formData.append("email", formState.inputs.email.value);
                formData.append("password", formState.inputs.password.value);
                formData.append("image", formState.inputs.image.value);
                const resData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/users/signup",
                    "POST",
                    formData
                );
                authData.login(resData.userId, resData.token);
            }catch(err){}
        }
    };

    const switchMode = (event) =>{
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        }else{
            setFormData({
                ...formState.inputs,
                name: {
                    value: "",
                    isValid: false
                },
                image: {
                    value: null,
                    isValid: false
                }
            },false);
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
                <hr/>
                <form onSubmit={submitHandler}>
                    {!isLoginMode &&
                        <div className={`form-control "form-control--invalid"}`}>
                            <label for="image-button">User Avatar</label>
                            <ImageUpload
                                center
                                id="image"
                                onInput={inputHandler}
                                errorText=""
                                infoText="Please Select An Image"
                            />
                        </div>
                    }
                    {!isLoginMode && (
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Name"
                            validators={[VALIDATOR_MINLENGTH(6)]}
                            errorText="Please Enter Name - Min Six Characters"
                            onInput={inputHandler}
                        />
                    )}
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please Enter Valid Email"
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        label="Password"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please Enter Password"
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? "Login" : "Sign Up"}</Button>
                </form>
                <Button inverse onClick={switchMode}>Switch To {isLoginMode ? "Sign Up" : "Login"}</Button>
            </Card>
        </React.Fragment>

    );
};

export default Auth;