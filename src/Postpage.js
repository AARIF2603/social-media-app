import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Postpage = ({posts,handleDelete}) => {
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id)
  return (
    <main className='Postpage'>
      <article className='post'>
        {post && 
            <>
              <h2>{post.title}</h2>
              <p className='postDate'>{post.datetime}</p>
              <p className='postBody'>{post.body}</p>
              <button onClick={()=>handleDelete(post.id)}>
                Delete post
              </button>
              <Link to= {`/edit/${post.id}`}> 
                <button >
                  Edit post
                </button>
              </Link>
            
            </>
        
        }
        {!post &&
            <>
              <h2>Post Not Found</h2>
              <p>Well, that's disappointing.</p>
              <p>
                <Link to='/'> Visit our Homepage</Link>
              </p>
            </>

        }
      </article>
        
      
    </main>
  )
}

export default Postpage