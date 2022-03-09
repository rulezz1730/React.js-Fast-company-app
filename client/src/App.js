/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./app/components/ui/navBar";
import Main from "./app/layouts/main";
import Login from "./app/layouts/login";
import Users from "./app/layouts/users";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./app/components/common/protectedRoute";
import LogOut from "./app/layouts/logOut";
import AppLoader from "./app/components/ui/hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar />
                {/* <ProfessionProvider> */}
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
                {/* </ProfessionProvider> */}
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
