import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RepositoryList from './components/RepositoryList';
import RepositoryDetails from './components/RepositoryDetails';
import UserProfile from './components/UserProfile';
import './styles.css';

const App = () => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const searchRepositories = (query) => {
    // Check if the query is empty
    if (!query) {
      setErrorMessage('Please enter a repository name.');
      return;
    }

    axios.get(`http://localhost:5000/api/search?query=${query}`)
      .then(response => {
        // Check if the response contains data
        if (response.data.items.length === 0) {
          setErrorMessage('No repositories found. Please try a different search term.');
          return;
        }
        setRepositories(response.data.items);
        setSelectedRepo(null);
        setUser(null);
        setErrorMessage(null); // Clear any previous error message
      })
      .catch(error => {
        // Handle error from API call
        setErrorMessage('Error searching repositories. Please try again later.');
      });
  };

  const selectRepository = (repo) => {
    axios.get(`http://localhost:5000/api/repo/${repo.owner.login}/${repo.name}`)
      .then(response => {
        setSelectedRepo(response.data);
        axios.get(`http://localhost:5000/api/user/${repo.owner.login}`)
          .then(userResponse => {
            setUser(userResponse.data);
          });
      });
  };

  return (
    <div className="container">
      <h1>Github Explorer</h1>
      <SearchBar onSearch={searchRepositories} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {repositories.length > 0 &&
        <RepositoryList repositories={repositories} onSelectRepo={selectRepository} />}
      {selectedRepo && <RepositoryDetails repo={selectedRepo} />}
      {user && <UserProfile user={user} />}
    </div>
  );
};

export default App;
