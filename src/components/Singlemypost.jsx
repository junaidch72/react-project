import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Singlemypost = () => {
  const [show,setShow] = useState(false)
  const [cshow,setCShow] = useState(true)
  const params = useParams();
  const [comment, setComment] = useState("");
  const [post, setPost] = useState([]);
  const [dcom, setDcom] = useState([]);

  useEffect(() => {
    fetch(`https://projectapireact.herokuapp.com/blogs?id=${params.id}`)
      .then((response) => response.json())
      .then((json) => setPost(json));
  }, [params]);

const getcomment= async ()=> {
    const response = await fetch(`https://projectapireact.herokuapp.com/blogs/${params.id}/comments `);
    setDcom(await response.json());
}



  useEffect(() => {
   getcomment();
  },[]);
let username = JSON.parse(localStorage.getItem("loginname"))
let userId = JSON.parse(localStorage.getItem("loginid"))
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://projectapireact.herokuapp.com/blogs/${params.id}/comments`, {
      method: "POST",
      body: JSON.stringify({
        body: comment,
        name: username,
        userId: userId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json());
    
      getcomment();
    setComment("");

  };


  const deletecomment=(id)=>{
    fetch(`https://projectapireact.herokuapp.com/comments/${id}`,{
      method:'Delete'
    }).then((result)=>{
      result.json()
    })
getcomment()
    
    }

    useEffect(()=>{
      deletecomment()
    })



const showbtn=(id,body)=>{
localStorage.setItem("commentid",id)
setShow(true)
setComment(body)
setCShow(false)

     
}

const handleupdate=()=>{
let id = JSON.parse(localStorage.getItem("commentid"))

  fetch(`https://projectapireact.herokuapp.com/comments/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name:JSON.parse(localStorage.getItem("loginname")),
          body: comment,
          userId: JSON.parse(localStorage.getItem("loginid")),
          blogId:params.id
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());

      setComment("")
      localStorage.removeItem("commentid")

     
      getcomment();
      setShow(false)
      setCShow(true)
}







  return (
    <section className="singlepost">
      <div className="container">
        {post.map((currElem) => {
          return (
            <div className="row" key={currElem.id}>
              <h1>{currElem.title}</h1>
              <p>{currElem.body}</p>
            </div>
          );
        })}

        <div className="comments">
          <form action="">
            <input
              type="text"
              placeholder="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
             {show? <button type="submit" onClick={handleupdate} className="comment-btn"> update</button>:null}
          {cshow?  <button type="submit" onClick={handleSubmit} className="comment-btn"> comment</button>:null}
        
          
          </form>
        </div>
      </div>

      <div className="display-comments">
        <h2>All Comments</h2>
        {dcom.map((commElem) => {
          return (
            <div className="row" key={commElem.id}>
              <h3>{commElem.name}</h3>
              <p>{commElem.body}</p>
              <div className="comment-operations">
               {commElem.userId === userId ? <>
                <button className="my-btn"onClick={()=>deletecomment(commElem.id)}> Delete</button>
                <button className="my-btn"onClick={()=>showbtn(commElem.id,commElem.body)}> Edit</button>
               
               </>:
               <></>
               }
               
                </div>
            </div>
            
            
          );
        }).reverse()}
      </div>
    </section>
  );
};

export default Singlemypost;
