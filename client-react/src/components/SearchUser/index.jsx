import React, { useState } from 'react';

function SearchUser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/search_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          username: searchQuery,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.searchResults);
      }
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  const handleFollowToggle = async (userId, isFollowed) => {
    try {
      const response = await fetch('http://localhost:8000/users/follow_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      if (response.ok) {
        setSearchResults((prevResults) =>
          prevResults.map((user) =>
            user.id === userId ? { ...user, isFollowed: !isFollowed } : user
          )
        );
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search by username"
          className="border p-1 mr-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-800 focus:outline-none"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="mt-2">
        {searchResults.map((user) => (
          <div key={user.id} className="flex items-center mt-2">
            <p className="mr-2">{user.username}</p>
            <button
              className={`bg-${user.isFollowed ? 'red' : 'green'}-600 text-white py-1 px-2 rounded hover:bg-${user.isFollowed ? 'red' : 'green'}-800 focus:outline-none`}
              onClick={() => handleFollowToggle(user.id, user.isFollowed)}
            >
              {user.isFollowed ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchUser;
