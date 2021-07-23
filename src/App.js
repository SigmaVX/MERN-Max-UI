import React, {Suspense} from 'react';
import {Route, Switch, Redirect}from "react-router-dom";
import { useAuth } from './util/hooks/authHook';
import {AuthContext} from "./context/AuthContext/AuthContext";
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';
import './App.css';
// import Users from "./containers/Users/Users";
// import NewPlace from "./containers/NewPlace/NewPlace";
// import MainNavigation from './components/UI/Navigation/MainNavigation/MainNavigation';
// import UserPlaces from './containers/UserPlaces/UserPlaces';
// import UpdatePlace from './containers/UpdatePlace/UpdatePlace';
// import Auth from './containers/Auth/Auth';

// Code Splitting
const Users = React.lazy(()=>import("./containers/Users/Users"));
const NewPlace = React.lazy(()=>import("./containers/NewPlace/NewPlace"));
const MainNavigation = React.lazy(()=>import("./components/UI/Navigation/MainNavigation/MainNavigation"));
const UserPlaces = React.lazy(()=>import("./containers/UserPlaces/UserPlaces"));
const UpdatePlace = React.lazy(()=>import("./containers/UpdatePlace/UpdatePlace"));
const Auth = React.lazy(()=>import("./containers/Auth/Auth"));

function App() {
  const {token, login, logout, userId} = useAuth();

  let routes;
  if(token){
    routes = (
      <Switch>
        <Route exact path="/places/new" component={NewPlace}/>
        <Route exact path="/places/:placeId" component={UpdatePlace}/>
        <Route exact path="/:userId/places" component={UserPlaces}/>
        <Route exact path="/" component={Users}/>
        <Redirect to="/" />
      </Switch>
    );
  }else{
    routes = (
      <Switch>
        <Route exact path="/auth" component={Auth}/>
        <Route exact path="/:userId/places" component={UserPlaces}/>
        <Route exact path="/" component={Users}/>
        <Redirect to="/auth" />
      </Switch>
    );
  };

  return (
    <React.Fragment>
      <Suspense
        fallback={
          <div className="center">
            <LoadingSpinner/>
          </div>
        }
      >
        <p className="srText">Welcome To The MERN Places App</p>
        <AuthContext.Provider value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}>
        <MainNavigation/>
        <main>
            {routes}
        </main>
        </AuthContext.Provider>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
