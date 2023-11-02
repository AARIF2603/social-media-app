import {Routes,Route, useNavigate} from 'react-router-dom';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import Missing from './Missing';
import Nav from './Nav';
// import Post from './Post';
import NewPost from './NewPost';
// import Postpage from './Postpage';
import Home from './Home';
import { useState,useEffect } from 'react';
import {format} from "date-fns";
import Postpage from './Postpage';
import api from "./api/posts"
import Edit from './Edit';
// import PostLayout from './PostLayout';



function App() {
  
  const [posts,setPosts] = useState([])

  const [search, setSearch] = useState('')
  const [searchRes,setSearchRes] = useState([])
  const [postTitle,setPostTitle] = useState([])
  const [postBody,setPostBody] = useState([])
  const [editTitle,setEditTitle] = useState([])
  const [editBody,setEditBody] = useState([])
  useEffect(() => {
    const fetchPost = async() => {
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      }catch(err){
        if(err.response){
         console.log(err.response.data)
         console.log(err.response.status)
         console.log(err.response.header)
        }else{
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchPost()
  },[])
  useEffect(() => {
    const filterPost = posts.filter((post) => (
      (post.body).toLowerCase()).includes(search.toLowerCase())||((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchRes(filterPost.reverse());
  },[posts , search])

const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id +1 : 1 ;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    console.log(datetime)
    const newpost = { id,title:postTitle,datetime,body:postBody};
    try{
      const response = await api.post("/posts",newpost)
      const addpost =[...posts,response.data];
      setPosts(addpost);
      setPostTitle('');
      setPostBody('');
      navigate('/')
    }catch(err){
      console.log(`Error: ${err.message}`)
    }
    

  }

  const handleDelete = async(id) =>{
    try{
      await api.delete(`/posts/${id}`)
      const postlist = posts.filter((posts) =>id!==posts.id)
      setPosts(postlist)
      navigate('/')
    }catch(err){
        console.log(`Error:${err.message}`)
    }
  }

  const handleEdit = async(id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatepost = { id,title:editTitle,datetime,body:editBody};
    try{
      const response = await api.put(`/posts/${id}`,updatepost)
      setPosts(posts.map(post => post.id===id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      navigate('/')
    }catch(err){
      console.log(`Error:${err.message}`)
    }
  }

  return (
    <div className="App">


      <Header title="My Socialmedia" />
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path='/' element={<Home posts={searchRes} />}/>
        <Route path= "post" >
          <Route index element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            postBody={postBody}
            setPostTitle={setPostTitle}
            setPostBody={setPostBody}
         />}/>
          <Route path=':id' element = {<Postpage posts={posts} handleDelete={handleDelete} />}/>
        </Route>
        <Route path="/edit/:id" element={<Edit 
          handleEdit={handleEdit}
          editTitle={editTitle}
          editBody={editBody}
          setEditTitle={setEditTitle}
          setEditBody={setEditBody}
          posts={posts}
        
        />}/>
        <Route path="about" element={<About />} />
        <Route path ="*" element={<Missing />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
