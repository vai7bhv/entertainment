import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from '../SingleContent'
import './Trending.css'
import CustomPagination from '../CustomPagination'
function Trending() {
  const API_KEY = '9d0850fe0b3796642680f7515f404c00'
  // const BASE_URL = ''
  const [content, setContent] = useState([])
  const [numOfPages, setnumOfPages] = useState()
  const [page, setPage] = useState(1)
  const fetchTrending = async () => {
    const { data } = await axios.get(`

https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`)
    console.log(data)
    setContent(data.results)
    setnumOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchTrending()
  }, [page])
  return (
    <div>
      <span className='pageTitle'>Trending</span>
      <div className='trending'>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              title={c.title || c.name}
              poster={c.poster_path}
              backdrop={c.backdrop_path}
              mediaType={c.media_type}
              date={c.release_date}
              voteAverage={c.vote_average}
            />
          ))}
      </div>

      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
    </div>
  )
}

export default Trending
