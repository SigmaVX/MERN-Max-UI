import React, {useEffect, useState} from "react";
import UsersList from "../../components/Users/UsersList/UsersList";
import ErrorModal from "../../components/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import {useHttpClient} from "../../util/hooks/httpHook";

const Users = (props) =>{
    const [loadedUsers, setLoadedUsers] = useState([]);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    useEffect(()=>{
        const fetchUsers = async () =>{
            try{
                const resData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);
                setLoadedUsers(resData.users);
            }catch(err){}
        };
        fetchUsers();
    },[sendRequest]);

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading &&
                <div className="center">
                    <LoadingSpinner/>
                </div>
            }
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </React.Fragment>
    );
};

export default Users;