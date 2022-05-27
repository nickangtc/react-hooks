// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [fetchError, setFetchError] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setPokemon(null)
    setFetchError(null)
    fetchPokemon(pokemonName)
      .then(pokemonData => setPokemon(pokemonData))
      .catch(error => setFetchError(error))
  }, [pokemonName])

  if (!pokemonName) {
    return 'Submit a pokemon'
  }
  if (fetchError) {
    return <PokemonInfoError error={fetchError} />
  }
  return pokemonName && pokemon ? (
    <PokemonDataView pokemon={pokemon} />
  ) : (
    <PokemonInfoFallback pokemonName={pokemonName} />
  )
}

function PokemonInfoError({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
