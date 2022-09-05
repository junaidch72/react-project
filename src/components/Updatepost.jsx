import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Updatepost = () => {

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");
  const navigate =useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || body === "") {
      alert(" all fields required");
    } else {
      fetch(` https://projectapireact.herokuapp.com/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          body: body,
          userId: JSON.parse(localStorage.getItem("loginid"))
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());

      setBody("");
      setTitle("");
      localStorage.removeItem('title');
      localStorage.removeItem('body')
      localStorage.removeItem('id')
      navigate("/home")
    }
  };

  useEffect(() => {
    setTitle(localStorage.getItem('title'))
    setBody(localStorage.getItem('body'))
    setId(localStorage.getItem('id'))
    
  },[])
  

  return (
    <section className="create">
      <div className="post-creater">
        <div className="tag">
          <h2>update Now</h2>
        </div>
        <div className="post-form">
          <form action="">
            <input
              autoComplete="off"
              type="text"
              name=""
              id=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <div className="textbox">
              <textarea
                name=""
                id=""
                cols="30"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="10"
                placeholder="write here"
              />
            </div>

            <button type="submit" onClick={handleSubmit} className="create-btn">
              update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Updatepost;
