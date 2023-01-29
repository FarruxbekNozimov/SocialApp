import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import { AuthContext } from './context/AuthContext'

function App () {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route path='/profile/:username' component={Profile}></Route>
        {user ? (
          <Route exact path='/' component={Home}></Route>
        ) : (
          <Route exact path='/' component={Login}></Route>
        )}
        {user ? (
          <Redirect to='/'></Redirect>
        ) : (
          <Route exact path='/login' component={Login}></Route>
        )}
        {user ? (
          <Redirect to='/'></Redirect>
        ) : (
          <Route exact path='/register' component={Register}></Route>
        )}
      </Switch>
    </Router>
  )
}

export default App
