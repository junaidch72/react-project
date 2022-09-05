import React from 'react'
import "../style.css"
import {BsFillChatSquareTextFill} from "react-icons/bs"
import {FaSignOutAlt} from "react-icons/fa";
import {Link, Outlet, useNavigate } from "react-router-dom"


const Header = () => {
  let username =JSON.parse(localStorage.getItem("loginname"))
    const navigate = useNavigate();
const signout =()=>{
localStorage.removeItem("loginname")
localStorage.removeItem("loginid")
localStorage.removeItem("loginstatus")
navigate("/")
}
  return (
<>
<header id="header">
  <div className="logo">Blogs <BsFillChatSquareTextFill className='blog'/> </div>
  <nav className="navbar">
 
  <Link className="nav-links" to="/home">Home</Link>
  <Link className="nav-links" to="mypost">My post</Link>
  <Link className="nav-links" to="createpost">Create</Link>
  <Outlet/>
 
</nav>
<div className="icons">
<h3>{username}</h3>
<FaSignOutAlt onClick={signout} className='signout'/>

</div>
</header>


</>
  )
}

export default Header