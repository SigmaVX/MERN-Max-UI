import React, {useState, useContext} from "react";
import {AuthContext} from "../../../context/AuthContext/AuthContext";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import Map from "../../UI/Map/Map";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import {useHttpClient} from "../../../util/hooks/httpHook";
import "./PlaceItem.css";

const PlaceItem = (props) =>{
    const authData = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const openMap = ()=>{setShowMap(true);};
    const closeMap = ()=>{setShowMap(false);};
    const showWarning = () =>{setShowConfirmModal(true);};
    const closeWarning = () =>{setShowConfirmModal(false);};

    const deleteHandler = async () =>{
        setShowConfirmModal(false);
        try{
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`,
                "DELETE",
                null,
                {Authorization: "Bearer " + authData.token}
            );
            props.onDelete(props.id);
        }catch(err){}
    };

    return(
        <React.Fragment>
            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className="place-item__image">
                        <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMap}>View On Map</Button>
                        {authData.userId === props.creatorId &&
                            <React.Fragment>
                                <Button to={`/places/${props.id}`}>Edit</Button>
                                <Button danger onClick={showWarning}>Delete</Button>
                            </React.Fragment>
                        }
                    </div>
                </Card>
            </li>
            <Modal
                show={showMap}
                onCancel={closeMap}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMap}>Close</Button>}
            >
                <div className="map-container">
                    <Map
                        center={props.coordinates}
                        zoom={16}
                    />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={closeWarning}
                header="Are You Sure?"
                footerClass="place-item_modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={closeWarning}>Cancel</Button>
                        <Button danger onClick={deleteHandler}>Delete</Button>
                    </React.Fragment>
                }
            >
                <p>Do You Want To Delete This Place?</p>
            </Modal>
            <ErrorModal error={error} onClear={clearError} />
        </React.Fragment>
    );
};

export default PlaceItem;