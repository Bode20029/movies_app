import { useEffect , useState } from 'react';
import Search from './components/search';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
const App = () => {
  const [searchTerm,setSearchTerm] = useState('');

  useEffect(() => {}, []);
  return (
  <main>
    <div className='pattern' />
    <div className='wrapper'>
      <header>
        <img src="./hero.png" alt="Hero Banner" />
      <h1>
          Find <span className='text-gradient'>Movies</span> You'll Enjoy Without Hassles
      </h1>
      </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1 className='text-white'> {searchTerm}</h1>
    </div>
  </main>
  )
}

export default App
