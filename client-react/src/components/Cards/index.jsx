import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const BookCard = ({ book }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/like_book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          owner_id: book.user._id,
          bookId: book._id,
          owner_id: book.user,
        }),
      });

      if (response.ok) {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error('Error liking the book:', error);
    }
  };

  return (
    <Card className="border rounded-lg bg-white overflow-hidden shadow-md">
      {book.pictureUrl && (
        <Card.Img src={book.pictureUrl} alt={`The cover for ${book.title}`} variant="top" />
      )}
      <Card.Body>
        <Card.Title className="text-lg font-semibold mb-1">{book.title}</Card.Title>
        <Card.Text>Author: {book.author}</Card.Text>
        <Card.Text>Genre: {book.genre}</Card.Text>
        <Card.Text>{book.review}</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white border-none flex justify-between items-center">
        <Button
          className={`flex-grow ${isLiked ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
          onClick={handleLikeClick}
        >
          {isLiked ? 'Unlike' : 'Like'}
        </Button>
        <span className="text-gray-600 text-sm">{book.likes.length} Likes</span>
      </Card.Footer>
    </Card>
  );
};

export default BookCard;
