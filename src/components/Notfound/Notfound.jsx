import React from 'react'
import styles from './Notfound.module.css'
import error from '../../assest/images/not.jpg'
export default function Notfound() {
  return (
    <>
    <div className=" container-fluid p-0">
      <div className="w-100 mx-auto  vh-75">
<img src={error} className='w-100 ' alt="" />
      </div>
    </div>
    </>
  )
}
