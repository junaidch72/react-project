import React from 'react'
import Header from './Header'
import { Routes, Route } from "react-router-dom";
import Feed from './Feed';
import Mypost from './Mypost';
import Createpost from './Createpost';
import Updatepost from './Updatepost';
import SinglePost from './SinglePost';
import Singlemypost from './Singlemypost';






export const Home = () => {
  return (
   <>
<div className="header">
  <Header/>
</div>
<main>
<Routes>
<Route path="/" element={<Feed />} />
<Route path="update" element={<Updatepost/>} />
<Route path="mypost" element={<Mypost/>}/>
<Route path="createpost" element={<Createpost/>} />
<Route path="blog/:id" element={<SinglePost/>} />
<Route path="myblog/:id" element={<Singlemypost/>} />




</Routes>


</main>



   
   
   </>
  )
}
