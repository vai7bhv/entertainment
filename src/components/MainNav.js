import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Trending from '@material-ui/icons/Whatshot'
import Movies from '@material-ui/icons/Movie'
import TvSeries from '@material-ui/icons/Tv'
import Search from '@material-ui/icons/SearchOutlined'
import { useHistory } from 'react-router-dom'
const useStyles = makeStyles({
  root: {
    // width: 500,
    position: 'fixed',
    zIndex: 100,
    bottom: 0,
    backgroundColor: '#0e0b16',
    width: '100%',
  },
})

export default function SimpleBottomNavigation() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const history = useHistory()
  useEffect(() => {
    if (value === 0) history.push('/')
    else if (value === 1) history.push('/movies')
    else if (value === 2) history.push('/series')
    else if (value === 3) history.push('/search')
  }, [value, history])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: '#e7dfdd' }}
        label='Trending'
        icon={<Trending />}
      />
      <BottomNavigationAction
        style={{ color: '#e7dfdd' }}
        label='Movies'
        icon={<Movies />}
      />
      <BottomNavigationAction
        style={{ color: '#e7dfdd' }}
        label='TV Series'
        icon={<TvSeries />}
      />
      <BottomNavigationAction
        style={{ color: '#e7dfdd' }}
        label='Search'
        icon={<Search />}
      />
    </BottomNavigation>
  )
}
