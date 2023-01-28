import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/login" component={Login}></Route>
				<Route exact path="/register" component={Register}></Route>
				<Route exact path="/profile/:username" component={Profile}></Route>
			</Switch>
		</Router>
	);
}

export default App;
