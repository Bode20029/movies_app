import { useEffect , useState } from 'react';
import Search from './components/search';

const App = () => {
  const [searchTerm,setSearchTerm] = useState('Search for a movie');
  return (
  <div className='wrapper'>
    <header>
      <img src="./hero.png" alt="Hero Banner" />
    <h1>
        Find <span className='text-gradient'>Movies</span> You'll Enjoy Without Hassles
    </h1>
    </header>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
  </div>
  )
}

export default App
