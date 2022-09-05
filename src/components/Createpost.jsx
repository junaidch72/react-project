import React, { useState } from "react";

const Createpost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || body === "") {
      alert(" all fields required");
    } else {
      fetch('  https://projectapireact.herokuapp.com/blogs', {
  method: 'POST',
  body: JSON.stringify({
    title: title,
    body: body,
    userId:localStorage.getItem("loginid")
    
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}).then((response) => response.json());

setBody("")
setTitle("")


     
    }
  };

  return (
    <section className="create">
      <div className="post-creater">
        <div className="tag">
          <h2>Create Now</h2>
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
              Create
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Createpost;
