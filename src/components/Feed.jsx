import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";

const Feed = () => {

  let userId=localStorage.getItem("loginid")

  const [post, setPost] = useState([]);
  const getPost = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    setPost(await response.json());
  };
  useEffect(() => {
    getPost();
  }, []);

   const [mypost, setmyPost] = useState([]);
  
  const getmyPost = async () => {
    const response = await fetch("  https://projectapireact.herokuapp.com/blogs");
    setmyPost(await response.json());
  };
  useEffect(() => {
    getmyPost();
  }, []);
  const deletepost=(id)=>{
    fetch(` https://projectapireact.herokuapp.com/blogs/${id}`,{
      method:'Delete'
    }).then((result)=>{
      result.json()
    })
    getmyPost();
    }

    useEffect(()=>{
      deletepost()
    })





    const updatepost=(id,title,body)=>{

      localStorage.setItem("id",id)
      localStorage.setItem("title",title)
      localStorage.setItem("body",body)
    
    }
 

  return (
    <>
      <section className="feed" id="feed">
        <div className="container">
        {mypost===null?
        post.map((currElem) => {
          return (
            <div className="row"  key={currElem.id}>
              <h2 >{currElem.title}</h2>
              <p>{currElem.body}</p>
              <div className="operations">
             <Link to={`home/blog/${currElem.id}`}> <button className="my-btn">Read</button></Link>
              </div>
            </div>
          );
        }):<>
        {mypost.map((currElem) => {
            return (
              <div className="row" key={currElem.id}>
                <h2>{currElem.title}</h2>
                <p>{currElem.body}</p>

                <div className="operations">
                {currElem.userId != userId? <Link to={`/home/myblog/${currElem.id}`}> <button className="my-btn">Read</button></Link>:<>
                
                <button className="my-btn"onClick={()=>deletepost(currElem.id)}> Delete</button>
                <Link to="/home/update">  <button className="my-btn" onClick={()=>updatepost(currElem.id,currElem.title,currElem.body)}>Update</button></Link>
                <Link to={`/home/myblog/${currElem.id}`}> <button className="my-btn">Read</button></Link>
                
                
                
                
                </>}

              
                </div>
                
              </div>
            );
          }).reverse()}
          {
             post.map((currElem) => {
              return (
                <div className="row" key={currElem.id}>
                  <h2>{currElem.title}</h2>
                  <p>{currElem.body}</p>
                  <div className="operations">
                  <Link to={`/home/blog/${currElem.id}`}> <button className="my-btn">Read</button></Link>
              </div>
                </div>
              );
            })

          }
        
        
        
        </>
      
      
      }
        
        </div>
      </section>
    </>
  );
};

export default Feed;
