import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <div className="user-profile">
            <h2>{user.login}</h2>
            <img src={user.avatar_url} alt={user.login} width="100" />
            <p>Followers: {user.followers}</p>
            <p>Following: {user.following}</p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">View on Github</a>
        </div>
    );
};

export default UserProfile;
