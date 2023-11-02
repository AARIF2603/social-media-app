import { useEffect } from "react"
import { useParams,Link } from "react-router-dom"
const Edit = ({handleEdit,editTitle,editBody,setEditTitle,setEditBody,posts}) => {
    const{id} = useParams()
    const post = posts.find((post)=>(post.id).toString() === id)
    useEffect(() => {
        if (post)
         setEditTitle(post.title);
         setEditBody(post.body);
    },[post,setEditTitle,setEditBody])
  return (
    <main className="NewPost">
        {editTitle && 
            <>
                <h2>Edit Post</h2>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="title">Title</label>
                    <input type="text"
                    id ="title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    />
                    <label htmlFor="body">Content</label>
                    <textarea name="" id="body" cols="30" rows="10"
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        required
                    ></textarea>
                    <button 
                        type
                        onClick={()=>handleEdit(post.id)}
                    >
                        Submit
                    </button>
                </form>
            </>
        }   
        
        {!editTitle &&
            
            <>
              <h2>Post Not Found</h2>
              <p>Well, that's disappointing.</p>
              <p>
                <Link to='/'> Visit our Homepage</Link>
              </p>
            </>

        }
        
    </main>
  )
}

export default Edit