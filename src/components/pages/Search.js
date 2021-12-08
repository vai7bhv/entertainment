import {
  Button,
  createMuiTheme,
  MuiThemeProvider,
  Tab,
  Tabs,
  TextField,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
// import {  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../CustomPagination'
import SingleContent from '../SingleContent'

function Search() {
  const [type, setType] = useState(0)
  const [content, setcontent] = useState([])
  const [page, setPage] = useState(1)
  const [searchText, setsearchText] = useState('')
  const [numOfPage, setnumOfPage] = useState()
  const API_KEY = '9d0850fe0b3796642680f7515f404c00'

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
      },
    },
  })

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? 'tv' : 'movie'
      }?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}`
    )
    console.log(data)
    setcontent(data.results)
    setnumOfPage(data.total_pages)
  }

  useEffect(() => {
    fetchSearch()
  }, [type, page])

  return (
    <div>
      <MuiThemeProvider theme={darkTheme}>
        <div
          style={{
            display: 'flex',
            margin: '15px 0',
          }}
        >
          <TextField
            style={{ flex: 1 }}
            className='search'
            label='Search'
            variant='filled'
            onChange={(e) => setsearchText(e.target.value)}
          />
          <Button
            variant='contained'
            style={{ marginLeft: 10 }}
            onClick={fetchSearch()}
          >
            <SearchIcon />
          </Button>
        </div>

        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setType(newValue)
            setPage(1)
          }}
          style={{
            paddingBottom: 5,
          }}
        >
          <Tab
            style={{ width: '50%', fontFamily: 'arial' }}
            label='Search Movies'
          />
          <Tab style={{ width: '50%' }} label='Search Web Series' />
        </Tabs>
      </MuiThemeProvider>
      <div className='movies'>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              title={c.title}
              poster={c.poster_path}
              // backdrop={c.backdrop_path}
              mediaType={type ? 'tv' : 'movie'}
              date={c.release_date}
              voteAverage={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPage > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPage} />
      )}
    </div>
  )
}

export default Search
