import React from 'react';

const RepositoryList = ({ repositories, onSelectRepo }) => {
    return (
        <div>
            <h2>Repositories</h2>
            <ul>
                {repositories.map(repo => (
                    <li key={repo.id} onClick={() => onSelectRepo(repo)}>
                        {repo.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RepositoryList;
