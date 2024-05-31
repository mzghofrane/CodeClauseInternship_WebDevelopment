import React from 'react';

const RepositoryDetails = ({ repo }) => {
    return (
        <div className="repo-details">
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <p>Stars: {repo.stargazers_count}</p>
            <p>Forks: {repo.forks_count}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View on Github</a>
        </div>
    );
};

export default RepositoryDetails;
