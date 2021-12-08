import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useGenre from '../../hooks/useGenre'
import CustomPagination from '../CustomPagination'
import Genre from '../Genre'
import SingleContent from '../SingleContent'

function Series() {
  const API_KEY = '9d0850fe0b3796642680f7515f404c00'
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([])
  const [numOfPage, setnumOfPage] = useState()
  const [genre, setGenre] = useState([])
  const [selectedGenre, setSelectedGenre] = useState([])
  const genreForUrl = useGenre(selectedGenre)
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=${page}&with_genres=${genreForUrl}`
    )
    console.log(data)
    setContent(data.results)
    setnumOfPage(data.total_pages)
  }

  useEffect(() => {
    fetchMovies()
  }, [page, genreForUrl])

  return (
    <div>
      <span>Series</span>
      <Genre
        type='tv'
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genre={genre}
        setGenre={setGenre}
        setPage={setPage}
      />

      <div className='movies'>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              title={c.name}
              poster={c.poster_path}
              // backdrop={c.backdrop_path}
              mediaType='tv'
              date={c.release_date}
              voteAverage={c.vote_average}
            />
          ))}
      </div>
      {numOfPage > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPage} />
      )}
    </div>
  )
}

export default Series
