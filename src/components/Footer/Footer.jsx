import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import styles from "./Footer.module.css";
import { useNavigate } from 'react-router-dom';


export default function Footer() {
 let navigate = useNavigate()

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className="bg-dark">Feed Back</Popover.Header>
      <Popover.Body>
         <strong>Thank You ♥</strong>
      </Popover.Body>
    </Popover>
  );


  return (
    <>
      <footer  className='p-5 pb-0  '>
        <div className="container mx-auto">
          <div className="row gy-2 d-flex justify-content-between  ">
            <div className="col-md-6 text-center ">
              <h2 className='h3 mb-3 '>
                Welcome From Our Cinema
              </h2>
              <p className=" fs-5 ">Here you will find everything you need, everything that is new to us, we are working to make everything easy for you.</p>
            </div>

          <div className="col-md-3 text-center">
            <h2 className='h3 mb-3  '>Contact Us...</h2>
            <ul className=' d-flex align-items-center justify-content-between col-md-9 mx-auto pt-3'>
              <li className='mb-2'><a href="https://www.facebook.com/ANIS.MA30?mibextid=LQQJ4d" target='__blank' className='nav-link  badge bg-primary fs-5'>
                <i className='fa fa-brands fa-facebook-f'></i>
                
                </a></li>

                <li className='mb-2'>
                  <a 
                  href="https://www.linkedin.com/in/mostafa-anis-301b98258" 
                  target='__blank' 
                  className='nav-link  badge bg-light text-primary fs-5'>
                <i className='fa fa-brands fa-linkedin'></i>
                
                </a></li>

                <li className='mb-2'><a href="https://github.com/ANIS303" target='__blank' className='nav-link  badge bg-secondary fs-5'>
                <i className='fa fa-brands fa-github'></i>
              
                </a></li>
              
            </ul>
          </div>
          </div>
        </div>
      </footer>
    </>
  )
}
