import { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
  user: {
    city: 'Tashkent',
    from: 'Uzbekistan',
    _id: '63d2b9b0341bc5b68c628e05',
    username: 'Salom',
    email: 'hello@gmail.com',
    password: '$2b$10$hYs6FRctnyE44A7VtHDL9ONjS/vECYWNfeJ091Gyv58aLIuSQ94RO',
    profilePicture: 'person/2.png',
    coverPicture: '',
    followers: ['63d2b9bd341bc5b68c628e07'],
    isAdmin: false,
    createdAt: '2023-01-26T17:34:40.662Z',
    updatedAt: '2023-01-27T08:57:15.364Z',
    __v: 0,
    followings: ['63d2b9bd341bc5b68c628e07'],
    desc: 'Hello How are you ?'
  },
  isFetching: false,
  error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
