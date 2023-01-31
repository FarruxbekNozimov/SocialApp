import React, { useContext } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<Router>
			<Switch>
				<Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
				<Route path="/register">{user ? <Redirect to="/" /> : <Login />}</Route>
				<Route exact path="/">
					{user ? <Home /> : <Login />}
				</Route>
				<Route exact path="/messanger">
					{user ? <Messenger /> : <Login />}
				</Route>
				<Route exact path="/profile/:username">
					{user ? <Profile /> : <Login />}
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
