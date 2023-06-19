import React, { useContext, useEffect, useState } from 'react'
import { apisContext } from '../../Context/ApisContext'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';import styles from "./Person.module.css";
import { Helmet } from 'react-helmet';
import { darkContext } from '../../Context/DarkContext';

export default function Person() {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let [wordLang,setWordLang]=useState('Trending People')
  let [isLoading,setLoading]=useState(false)
  let [wordInfo,setWord]=useState("")
  let [allData,setAllData]=useState(null)
  let {baseImgurl,trending,lang}=useContext(apisContext)
  let {isdark}=useContext(darkContext)
  // animation word 
  let wordInterval=()=>{
    const word = wordLang;
      let currentIndex = 0;
      let finalWord = '';
      const intervalId = setInterval(() => {
        finalWord += word[currentIndex];
        setWord(finalWord)
        currentIndex++;
        if (currentIndex === word.length) {
          clearInterval(intervalId);
          setWord(word)
        }
      },10);
  }
// change words
  let changWors=()=>{
    if (lang=="en") {
      setWordLang("Trending People")
    }else{setWordLang("نجم الشهر")}
  }
  // call data tv 
  let getData=async (page)=>{
    setLoading(true)
    let {data} = await trending("person",page)
    setAllData(data)
    setPageCount(data.total_pages)
    setLoading(false)

  }

  //  paginatin 
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected+1)
  };
// handel resize for respons
  const getDisplayedPages = () => {
    if (windowWidth < 768) {
      return 1; // Display only 1 page on small screens
    } else if (windowWidth < 1200) {
      return 3; // Display 3 pages on medium screens
    } else {
      return 5; // Display 5 pages on large screens
    }
  };

  // render apis when component ready
  useEffect(()=>{
    getData()
  },[])
  
  // update data when page change 
  useEffect(()=>{
    getData(currentPage)
  },[currentPage])

  //  handel response for pagination component 
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

   // lang 
   useEffect(()=>{
    getData()
    changWors()
  },[lang])
  
  // text change 
  useEffect(()=>{
    wordInterval()
  },[wordLang])

  return (
    <>
    <Helmet>
        <title>People</title>
        </Helmet>
    {isLoading?<>
      <div className="loader">
      </div>
      </>: <>
      <div className="container py-5">
        <div className="row text-center">
          <div className="col-md-7 mx-auto">
         
         
          <h2 className='my-5'>{wordInfo}</h2>

         

       

          </div>
        </div>
      </div>
    <div className="container-fluid px-5 my-5">
      <div className="row g-1 gy-3">
        {allData?.results?.map((person)=>
            <div className="col-md-6 col-lg-3 col-xl-2 "> 
            <Card text={isdark?"bg-dark":"bg-light"}  key={person.id} className="shadow-lg h-100">
            <Card.Img variant="top" src={baseImgurl+person.profile_path} />
            <Card.Body>
              <Card.Title>{person.name}</Card.Title>
              <Card.Text className='my-1 row'>
                    <div className="col-12"><h6>{lang==="en"?"From his works":"اشهر الاعمال"}</h6></div>
                    <div className="col-12 ">
                      <ul>
                      {person.known_for.map(work=><li key={work.id}>
                        <Link  to={"/movies/"+work.id} className='nav-link'>{work.original_title}</Link>
                      </li>)}
                      </ul>
                    </div>
              </Card.Text>
             
            </Card.Body>
            <Card.Footer> <Card.Link><Link className='fw-bold' to={"/person/"+person.id}>{lang=="en"?"read more":"المزيد"}...</Link></Card.Link></Card.Footer>
          </Card></div>
          
        )}
      </div>
    </div></>}
    <div className="container-fluid px-5 my-5">
          <div className="row ">
            <div className="col-6 mx-auto">
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={getDisplayedPages()} // Number of page links to display
                marginPagesDisplayed={1} // Number of page links to display at the beginning and end
                onPageChange={handlePageChange} // Callback function for page change
                containerClassName="pagination justify-content-center "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLabel={lang=="en"?"next >":"التالي >"}
                previousLabel={lang=="en"?"< previous":"< السابق"}
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
            </div>
          </div>
      
    </div>
    
    </>
  )
}
