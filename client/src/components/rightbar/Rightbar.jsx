import './rightbar.css'
import Online from '../online/Online'
import { Users } from '../../dummyData'

export default function Sidebar ({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
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
          <div className='rightbarFollowing'>
            <img
              className='rightbarFollowingImg'
              src={`${PF}/person/1.png`}
              alt=''
            />
            <span className='rightbarFollowingName'>John Carter</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              className='rightbarFollowingImg'
              src={`${PF}/person/2.png`}
              alt=''
            />
            <span className='rightbarFollowingName'>John Carter</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              className='rightbarFollowingImg'
              src={`${PF}/person/3.png`}
              alt=''
            />
            <span className='rightbarFollowingName'>John Carter</span>
          </div>
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
