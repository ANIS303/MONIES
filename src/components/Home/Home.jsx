import React, { useContext, useEffect, useState } from 'react'
import styles from "./Home.module.css";
import {Helmet} from "react-helmet";
import { apisContext } from '../../Context/ApisContext';
import MoviesFatures from "../MoviesFatures/MoviesFatures.jsx"
import PeopleFatures from "../PeopleFatures/PeopleFatures.jsx"
import TvShowFatures from "../TvShowFatures/TvShowFatures.jsx"

export default function Home({isdark}) {
let [isLoading,setLoading]=useState(false)
let [moviesData,setMovies]=useState([])
let [personData,setPersons]=useState([])
let [tvData,setTvData]=useState([])
let {trending,lang}=useContext(apisContext)

let getData= async(mtype,callBack,page)=>{
  let {data} = await trending(mtype,page)
    callBack(data.results)
}

let getInformation=async()=>{
  setLoading(true)
  await getData("movie",setMovies)
  await getData("person",setPersons)
  await getData("tv",setTvData)
  setLoading(false)
}

  useEffect(()=>{
    getInformation()
  },[])
  useEffect(()=>{
    getInformation()
   
  },[lang])




  return (
  <>
        <Helmet>
        <title>Cinema Tred</title>
        </Helmet>

      {isLoading?<>
      <div className="loader">
      </div>
      </>:<>
    <div className="container-fluid py-5 my-5 ">
    
      <MoviesFatures isdark={isdark}  moviesData={moviesData}></MoviesFatures>
      <PeopleFatures   personData={personData}></PeopleFatures>
      <TvShowFatures   tvData={tvData}></TvShowFatures>
      </div>
      </>}
     
      </>
  )
}
