import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BookCard from '../../components/Cards';
import BookSearchBar from '../../components/SearchBar';
import SideBar from '../../components/SideBar';

const MainComponent = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [source, setSource] = useState('Following');

  useEffect(() => {
    const fetchFollowingBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/following_books', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch following books');
        }

        const data = await response.json();
        setBooks(data.followingBooks);
        setFilteredBooks(data.followingBooks);
        setSource('Following');
      } catch (error) {
        console.error('Error fetching following books:', error);
      }
    };

    fetchFollowingBooks();
  }, []);

  const handleSearch = (searchQuery) => {
    const filtered = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredBooks(filtered);
    setSource('Search');
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideBar/>
      <div className="w-3/4 p-8">
        <Container>
          <Row className="mb-4">     
            <BookSearchBar onSearch={handleSearch} />
          </Row>
          <Row>
            <Col>
              <p className="mb-2">Showing {source} Books:</p>
            </Col>
          </Row>
          <Row>
            {filteredBooks.map((book) => (
              <Col key={book._id} xs={12} md={4} className="mb-4">
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MainComponent;
