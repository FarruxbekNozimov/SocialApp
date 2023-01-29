import './rightbar.css'
import Online from '../online/Online'
import { Users } from '../../dummyData'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@mui/icons-material'

export default function Sidebar ({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setFriends] = useState([])
  const { user: currentUser, dispatch } = useContext(AuthContext)
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  )

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?.id))
  }, [currentUser, user?.id])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get('/users/friends/' + user._id)
        console.log(friendList)
        setFriends(friendList.data)
      } catch (err) {
        console.log(err)
      }
    }
    getFriends()
  }, [user])

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put('/users/' + user._id + '/unfollow', {
          userId: currentUser._id
        })
        dispatch({ type: 'UNFOLLOW', payload: user._id })
      } else {
        await axios.put('/users/' + user._id + '/follow', {
          userId: currentUser._id
        })
        dispatch({ type: 'FOLLOW', payload: user._id })
      }
    } catch (err) {
      console.log(err)
    }
    setFollowed(!followed)
  }

  const HomeRightbar = () => {
    return (
      <div>
        <div className='birthdayContainer'>
          <h4 className='rightbarTitle'>Online Friends</h4>
          <ul className='rightbarFriendList'>
            {Users.map(u => (
              <Online key={u.id} user={u}></Online>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  const ProfileRightbar = () => {
    return (
      <>
        {user.username != currentUser.username && (
          <button className='rightbarFollowButton' onClick={handleClick}>
            {followed ? "Do'st bo'lish" : 'Rad etish'}
            {followed ? <Add></Add> : <Remove></Remove>}
          </button>
        )}
        <h4 className='rightbarTitle'>User information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City </span>
            <span className='rightbarInfoValue'>{user.city} </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From </span>
            <span className='rightbarInfoValue'>{user.from} </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Phone </span>
            <span className='rightbarInfoValue'>{user.phone} </span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User Friends</h4>
        <div className='rightbarFollowings'>
          {friends.map(friend => (
            <Link
              to={`/profile/` + friend.username}
              style={{ textDecoration: 'none' }}
            >
              <div className='rightbarFollowing'>
                <img
                  className='rightbarFollowingImg'
                  src={friend.profilePicture || PF + 'person/user.png'}
                  alt=''
                />
                <span className='rightbarFollowingName'>{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {user ? (
          <ProfileRightbar></ProfileRightbar>
        ) : (
          <HomeRightbar></HomeRightbar>
        )}
      </div>
    </div>
  )
}
