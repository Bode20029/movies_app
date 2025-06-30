import { useEffect , useState } from 'react';
import Search from './components/search';
import MovieCard from './components/MovieCard';
import Spinner from './components/Spinner';
import { useDebounce } from 'react-use';
import { updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log('API_KEY loaded:', API_KEY ? 'Yes' : 'No');
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
const App = () => {
  const [searchTerm,setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  // Debounce the search term to avoid too many API calls
  // This will wait for 500ms after the user stops typing before updating the debounced
  // search term, which is then used to fetch movies.
  // This helps to reduce the number of API calls made while the user is typing.
  useDebounce(() => { setDebouncedSearchTerm(searchTerm); }, 500, [searchTerm]);

  useEffect(() =>  {
    const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      
      if(data.response === 'false') {
        setErrorMessage(data.error || 'An error occurred while fetching movies.');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      if(query && data.results.length > 0){
        await updateSearchCount(query, data.results[0].id);
      } // Call the function to update search count in Appwrite
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }; 
  fetchMovies(debouncedSearchTerm); }, [debouncedSearchTerm]);
  return (
  <main>
    <div className='pattern' />
    <div className='wrapper'>
      <header>
        <img src="./hero.png" alt="Hero Banner" />
      <h1>
          Find <span className='text-gradient'>Movies</span> You'll Enjoy Without Hassles
      </h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
        
      <section className='all-movies'>
        <h2 className='mt-[40px]'>All Movies</h2>

        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
           <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            { movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )
      }
        
      </section>
    </div>
  </main>
  )
}

export default App
