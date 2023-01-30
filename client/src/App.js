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
import Messenger from './pages/messenger/Messenger'

function App () {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        {user ? (
          <Route exact path='/messenger' component={Messenger}></Route>
        ) : (
          <Redirect to='/login'></Redirect>
        )}
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
        <Route path='/profile/:username' component={Profile}></Route>
      </Switch>
    </Router>
  )
}

export default App
