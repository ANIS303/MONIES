import React from 'react'
import { Navigate } from 'react-router-dom';
// import styles from './ProtactedRoutes.module.css'


export default function ProtactedRoutes(props) {
  


if (localStorage.getItem("userInfo")) {
  
return props.children


}else{
  return <Navigate to='/login'/>

}



}
