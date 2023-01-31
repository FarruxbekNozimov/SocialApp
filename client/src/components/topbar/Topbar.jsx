import './topbar.css'
import { Search, Person, Chat, Notifications } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function Topbar () {
  const { user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='logo'>Yuzkitob</span>
        </Link>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <Search className='searchIcon'></Search>
          <input
            type='text'
            placeholder='Search ... '
            className='searchInput'
          />
        </div>
      </div>
      <div className='topbarRight'>
        <div className='topbarLinks'>
          <span className='topbarLink'>Home</span>
          <span className='topbarLink'>Timeline</span>
        </div>
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <Person></Person>
            <span className='topbarIconBadge'>1</span>
          </div>
          <div className='topbarIconItem'>
            <Chat></Chat>
            <span className='topbarIconBadge'>2</span>
          </div>
          <div className='topbarIconItem'>
            <Notifications></Notifications>
            <span className='topbarIconBadge'>1</span>
          </div>
        </div>
        <Link to={`profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + 'person/user.png'
            }
            alt=''
            className='topbarImg'
          />
        </Link>
      </div>
    </div>
  )
}
