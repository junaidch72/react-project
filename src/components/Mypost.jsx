import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Mypost = () => {

  const [mypost, setmyPost] = useState([]);
  let userid = localStorage.getItem("loginid")

  
  const getmyPost = async () => {
    const response = await fetch(`https://projectapireact.herokuapp.com/blogs?userId=${userid}`);
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



      <section className="mypost">
        <div className="container">
          
        
         { mypost.map((currElem) => {
            return (
              <div className="row" key={currElem.id}>
                <h2>{currElem.title}</h2>
                <p>{currElem.body}</p>

                <div className="operations">
                <button className="my-btn"onClick={()=>deletepost(currElem.id)}> Delete</button>
               <Link to="/home/update" className="post-link"> <button className="my-btn" onClick={()=>updatepost(currElem.id,currElem.title,currElem.body)}>Update</button></Link>
               <Link to={`/home/myblog/${currElem.id}`}> <button className="my-btn">Read</button></Link>
                </div>
                
              </div>
            );
          }).reverse()}
        </div>
      </section>
    </>
  );
};

export default Mypost;
