import {useCallback, useReducer}  from "react";

const formReducer = (state, action) =>{
    switch(action.type){
        case("INPUT_CHANGE"):
            let formIsValid = true;
            for(const inputId in state.inputs){
                // skip validation if input ID is undefined
                if(!state.inputs[inputId]){continue;}
                // update form based on isValid param - sent with dispatch
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                // update form based other state inputs for each input
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            };
            return{
                ...state,
                isValid: formIsValid,
                inputs:{
                    ...state.inputs,
                    // dynamically set each input - name much match state exactly
                    [action.inputId]: {value: action.value, isValid: action.isValid}
                }
            };
        // used to set data returned from API
        case("SET_DATA"):
            return{
                inputs: action.inputs,
                isValid: action.formIsValid
            };
        default: return state;
    }
};

export const useForm = (initialInputs, initialFormValidity)=>{
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity
    });

    const inputHandler = useCallback((id, value, isValid) =>{
        dispatch({
            type: "INPUT_CHANGE",
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, []);

    const setFormData = useCallback((inputData, formValidity)=>{
        dispatch({
            type: "SET_DATA",
            inputs: inputData,
            formIsValid: formValidity
        });
    }, []);

    return [formState, inputHandler, setFormData];
};