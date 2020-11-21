import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Campgrounds from "./components/Campgrounds";
import ShowCampground from "./components/screens/show";
import CreateCampground from "./components/screens/create";
import UpdateCampground from "./components/screens/update";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignInScreen from "./components/User/SigninScreen";
import { useSelector } from "react-redux";

function App() {
    const currentUser = useSelector((state) => state.currentUser);
    const { isAuhenticated, user } = currentUser;

    return ( <
        Router >
        <
        div className = "App" >
        <
        Header / >
        <
        div className = "content" >
        <
        Route path = "/"
        component = { Home }
        exact = { true }
        />{" "} <
        Route path = "/campgrounds"
        component = { Campgrounds }
        exact = { true }
        />{" "} <
        Route path = "/signin"
        component = { SignInScreen }
        exact = { true }
        />{" "} <
        Route path = "/signup"
        component = { SignInScreen }
        exact = { true }
        // render={(props) => {
        //   signup = "signup";
        // }}
        />{" "} <
        Route path = "/new"
        component = { CreateCampground }
        exact = { true }
        user = { user }
        isAuhenticated = { isAuhenticated }
        />{" "} <
        Route path = "/campgrounds/:id"
        component = { ShowCampground }
        exact = { true }
        />{" "} <
        Route path = "/campgrounds/:id/edit"
        component = { UpdateCampground }
        exact = { true }
        /> {
            /* <Route path="" component={} exact={true} />
                                  <Route path="" component={} exact={true} />
                                  <Route path="" component={} exact={true} />
                                  <Route path="" component={} exact={true} /> */
        } { " " } <
        /div>{" "} <
        /div>{" "} <
        Footer / >
        <
        /Router>
    );
}

export default App;