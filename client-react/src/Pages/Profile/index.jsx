import React, { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar';
import BookCard from '../../components/Cards';
import AddBookForm from '../../components/AddBookForm';
import SearchUser from '../../components/SearchUser';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate(); 
  const [userInfo, setUserInfo] = useState(null);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [isViewingFavorites, setIsViewingFavorites] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/get_user_info', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleBookAdded = (newBook) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      ownBooks: [...prevUserInfo.ownBooks, newBook],
    }));
    setIsAddingBook(false);
  };

  const toggleViewFavorites = () => {
    setIsViewingFavorites(!isViewingFavorites);
  };

  if (!userInfo) {
    return <p>Loading user info...</p>;
  }

  const booksToShow = isViewingFavorites ? userInfo.favoriteBooks : userInfo.ownBooks;

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideBar />
      <div className="w-3/4 p-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between mb-4" >
            <SearchUser />
          <button
            className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-800 focus:outline-none"
            onClick={handleSignOut} 
            >
              Sign Out
            </button>
            
          </div>

          <h1 className="text-3xl font-semibold mb-4">Profile</h1>
          <div className="flex mb-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{userInfo.username}</h2>
              <p className="text-gray-600">Likes: {userInfo.ownLikesCount}</p>
              <p className="text-gray-600">Own Books: {userInfo.ownBooksCount}</p>
              <p className="text-gray-600">Following: {userInfo.followingCount}</p>
            </div>
          </div>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none"
            onClick={() => setIsAddingBook(!isAddingBook)}
          >
            {isAddingBook ? 'Cancel' : 'Add New Book'}
          </button>
          <button
            className="mt-4 ml-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none"
            onClick={toggleViewFavorites}
          >
            {isViewingFavorites ? 'View Own Books' : 'View Favorite Books'}
          </button>
          {isAddingBook && <AddBookForm onBookAdded={handleBookAdded} />}
          <h2 className="text-xl font-semibold mt-4 mb-2">
            {isViewingFavorites ? 'Your Favorite Books' : 'Your Own Books'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {booksToShow.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
