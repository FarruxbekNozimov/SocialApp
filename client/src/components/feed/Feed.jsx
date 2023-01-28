import { useState, useEffect } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import axios from 'axios'

export default function Feed ({ username }) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get('/posts/profile/' + username)
        : await axios.get('/posts/timeline/63d2b9b0341bc5b68c628e05')
        
      setPosts(res.data)
    }
    fetchPosts()
  }, [username])

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <Share></Share>
        {posts.map(p => (
          <Post key={p._id} post={p}></Post>
        ))}
      </div>
    </div>
  )
}
