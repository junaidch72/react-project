import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const params = useParams();
  const [comment, setComment] = useState("");
  const [post, setPost] = useState([]);
  const [dcom, setDcom] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?id=${params.id}`)
      .then((response) => response.json())
      .then((json) => setPost(json));
  }, [params]);

  useEffect(() => {
    fetch(` https://jsonplaceholder.typicode.com/posts/${params.id}/comments `)
      .then((response) => response.json())
      .then((json) => setDcom(json));
  }, [params]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      ` https://jsonplaceholder.typicode.com/posts/${params.id}/comments `,
      {
        method: "POST",
        body: JSON.stringify({
          body: comment,
          name: localStorage.getItem("loginname"),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });

    setComment("");
  };

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
            <button
              type="submit"
              onClick={handleSubmit}
              className="comment-btn"
            >
              comment
            </button>
          </form>
        </div>
      </div>

      <div className="display-comments">
        <h2>All Comments</h2>
        {dcom.map((currElem) => {
          return (
            <div className="row" key={currElem.id}>
              <h3>{currElem.name}</h3>
              <p>{currElem.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SinglePost;
