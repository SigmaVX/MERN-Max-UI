import React, {useRef, useState, useEffect} from "react";
import Button from "../Button/Button";
import "./ImageUpload.css";

const ImageUpload = (props) =>{
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    useEffect(()=>{
        if(!file){return;};
        const fileReader = new FileReader();
        fileReader.onload = () =>{
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file]);

    const pickImageHandler = () =>{
        filePickerRef.current.click();
    };

    const pickedHandler = (event) =>{
        let pickedFile;
        let fileIsValid;
        if(event.target.files && event.target.files.length === 1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }else{
            setIsValid(false);
            fileIsValid = false;
        };
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    return(
        <div className="form-control">
            <input
                id={props.id}
                style={{display: "none"}}
                type="file"
                accept=".jpg, .png, .jpeg"
                ref={filePickerRef}
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && "center"}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview"/>}
                    {!previewUrl && <p>{props.infoText}</p>}
                </div>
                <Button id="image-button" type="button" onClick={pickImageHandler}>
                    Upload Image
                </Button>
            </div>
            {!isValid && <p className="center">{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;