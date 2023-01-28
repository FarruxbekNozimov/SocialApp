import './post.css'
import { MoreVert } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export default function Post ({ post }) {
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState({})
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`)
      console.log(res)
      setUser(res.data)
    }
    fetchUser()
  }, [post.userId])

  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`profile/${user.username}`}>
              <img
                className='postProfileImg'
                src={user.profilePicture || PF + 'person/user.png'}
                alt=''
              />
            </Link>
            <span className='postUsername'>
              {user.username}
              <br /> <span className='postDate'>{format(post.createdAt)}</span>
            </span>
          </div>
          <div className='postTopRight'>
            <MoreVert></MoreVert>
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>
          <img className='postImg' src={PF + post?.img} alt='' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              className='reactIcon'
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=''
            />
            <span className='postLikeCounter'>{like} people like it</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
