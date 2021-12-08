import React, { useEffect } from 'react'
import axios from 'axios'
import { Chip } from '@material-ui/core'

function Genre({
  type,
  selectedGenre,
  setSelectedGenre,
  setGenre,
  genre,
  setPage,
}) {
  const API_KEY = '9d0850fe0b3796642680f7515f404c00'

  const fetchGenre = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
    )
    setGenre(data.genres)
  }

  const handleAdd = (genre) => {
    setSelectedGenre([...selectedGenre, genre])
    // need for change ......
    //  setGenre(genre.filter((g) => g.id !== genre.id))
    setPage(1)
  }

  const handleRemove = (gen) => {
    setSelectedGenre(selectedGenre.filter((selected) => selected.id !== gen.id))
    setGenre([...genre, gen])
  }

  console.log(genre)
  useEffect(() => {
    fetchGenre()
    return () => {
      setGenre({})
    } // eslint-disable-next-line
  }, [])
  return (
    <div style={{ padding: '6px 0px' }}>
      {selectedGenre &&
        selectedGenre.map((genre) => (
          <Chip
            label={genre.name}
            key={genre.id}
            clickable
            style={{ margin: '2px' }}
            color='primary'
            size='small'
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genre &&
        genre.map((genre) => (
          <Chip
            label={genre.name}
            id={genre.id}
            clickable
            style={{ margin: '2px' }}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  )
}

export default Genre
