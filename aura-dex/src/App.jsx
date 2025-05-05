import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [allpoki, setallpoki] = useState([])
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);
  const offset = 20;

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      fetchPokemonDetails(selectedPokemon);
    }
  }, [selectedPokemon]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      let response = await fetch('http://localhost:3000/mons');
      let data = await response.json();
      setPokemon(data);
      try {
        const allPokiResponse = await fetch('http://localhost:3000/mons/allpoki');
        const allPokiData = await allPokiResponse.json();
        setallpoki(allPokiData);
        console.log(allPokiData);
      } catch (err) {
        console.error('Error fetching all pokemon:', err);
      }
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonDetails = async (name) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/mons/info/${name}`);
      const data = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePokemon = async () => {
    try {
      setLoadingMore(true);
      const response = await fetch('http://localhost:3000/mons');
      const newPokemon = await response.json();
  
      setPokemon(newPokemon);
    } catch (error) {
      console.error('Error loading more Pokemon:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const searchSuggestions = allpoki
    .filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 8);
  
  const getPokemonUrl = (name) => {
    const pokemonObj = pokemon.find(p => p.name === name);
    return pokemonObj ? pokemonObj.url : null;
  };

  const handleSelectFromSearch = (name) => {
    setSelectedPokemon(name);
    setSearchTerm('');
    setShowSearchResults(false);
  };

  return (
    <div className="pokedex-container">
      <header className="header">
        <h1>AuraDex</h1>
        <div className="search-wrapper" ref={searchRef}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSearchResults(e.target.value !== '');
              }}
              onFocus={() => searchTerm && setShowSearchResults(true)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search" 
                onClick={() => {
                  setSearchTerm('');
                  setShowSearchResults(false);
                }}
              >
                ×
              </button>
            )}
          </div>
          {showSearchResults && searchTerm && (
            <div className='search-results'>
              {searchSuggestions.length > 0 ? (
                searchSuggestions.map((pokemonName) => {
                  const url = getPokemonUrl(pokemonName);
                  return (
                    <div 
                      key={pokemonName} 
                      className="search-result-item"
                      onClick={() => handleSelectFromSearch(pokemonName)}
                    >
                      {url ? (
                        <img 
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.split('/')[6]}.png`} 
                          alt={pokemonName} 
                          className="search-result-sprite"
                        />
                      ) : (
                        <div className="search-result-sprite placeholder"></div>
                      )}
                      <span style={{ color: "black" }}>{pokemonName}</span>
                    </div>
                  );
                })
              ) : (
                <div className="no-results">No Pokémon found</div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        <div className="pokemon-list">
          <h2>Pokémon List</h2>
          {loading && !loadingMore && !pokemonDetails ? (
            <div className="loading">Loading Pokémon...</div>
          ) : (
            <>
              <ul className="pokemon-grid">
                {pokemon.map((p) => (
                  <li 
                    key={p.name} 
                    className={`pokemon-card ${selectedPokemon === p.name ? 'selected' : ''}`}
                    onClick={() => setSelectedPokemon(p.name)}
                  >
                    <div className="pokemon-name">{p.name}</div>
                    <img 
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.url.split('/')[6]}.png`} 
                      alt={p.name} 
                      className="pokemon-sprite"
                    />
                  </li>
                ))}
              </ul>
              <div className="load-more-container">
                <button 
                  className="load-more-btn"
                  onClick={loadMorePokemon}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading...' : 'Load More Pokémon'}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="pokemon-details">
          <h2>Pokémon Details</h2>
          {loading && pokemonDetails ? (
            <div className="loading">Loading details...</div>
          ) : pokemonDetails ? (
            <div className="detail-card">
              <h3 className="detail-name">{pokemonDetails.name}</h3>
              <div className="detail-image-container">
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.find(p => p.name === pokemonDetails.name)?.url.split('/')[6]}.png`}
                  alt={pokemonDetails.name}
                  className="detail-image" 
                />
              </div>
              <div className="detail-info">
                <div className="detail-types">
                  {pokemonDetails.type.map((t) => (
                    <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                      {t.type.name}
                    </span>
                  ))}
                </div>
                <div className="detail-stats">
                  <div className="stat">
                    <span className="stat-label">Height:</span>
                    <span className="stat-value">{pokemonDetails.height / 10} m</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Weight:</span>
                    <span className="stat-value">{pokemonDetails.weight / 10} kg</span>
                  </div>
                </div>
                <div className="detail-abilities">
                  <h4>Abilities</h4>
                  <ul>
                    {pokemonDetails.abilities.map((a) => (
                      <li key={a.ability.name} className = {`abilities`}>
                        {a.ability.name} {a.is_hidden && "(Hidden)"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">Select a Pokémon to view details</div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
