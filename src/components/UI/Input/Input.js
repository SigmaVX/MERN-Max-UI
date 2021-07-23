import React, {useReducer, useEffect} from "react";
import PropTypes from "prop-types";
import { validate } from "../../../util/validators";
import "./Input.css";

// Reducer For useReducer - Manages Validation and Touched
const inputReducer = (state, action) =>{
    switch(action.type){
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case "TOUCH":
                return {
                    ...state,
                    isTouched: true
                };
        default:
            return state;
    }
};

const Input = (props) =>{
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || "",
        isValid: props.initialValid || false,
        isTouched: false
    });
    const {id, onInput} = props;
    const {value, isValid} = inputState;

    useEffect(()=>{
        onInput(id, value, isValid);
    },[id, value, isValid, onInput]);


    const changeHandler = (event) =>{
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () =>{
        dispatch({type: "TOUCH"});
    };

    const element = props.element === "input"
        ?   <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={(e)=>changeHandler(e)}
                onBlur={touchHandler}
                value={inputState.value}
            />
        :   <textarea
                id={props.id}
                rows={props.row || 3}
                onChange={(e)=>changeHandler(e)}
                onBlur={touchHandler}
                value={inputState.value}
            />;

    return(
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && "form-control--invalid"}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;
Input.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    row: PropTypes.number,
    label: PropTypes.string.isRequired,
    validators: PropTypes.array.isRequired,
    onInput: PropTypes.func.isRequired,
    errorText: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    initialValid: PropTypes.bool
};