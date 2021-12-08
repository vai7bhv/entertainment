import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import SimpleBottomNavigation from './components/MainNav'
import { Container } from '@material-ui/core'
import Trending from './components/pages/Trending'
import Movies from './components/pages/Movies'
import Series from './components/pages/Series'
import Search from './components/pages/Search'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='app'>
        <Container>
          <Switch>
            <Route path='/' component={Trending} exact />
            <Route path='/movies' component={Movies} />
            <Route path='/series' component={Series} />
            <Route path='/search' component={Search} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  )
}

export default App
