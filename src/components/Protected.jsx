import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


export const Protected = (props) => {
    const {Componenet}= props
    const navigate = useNavigate();
    useEffect(()=>{
        let login = localStorage.getItem("loginstatus")
        if(!login){
            navigate("/")
        }
    })



  return (
    <>
    <Componenet/>
    </>
  )
}
