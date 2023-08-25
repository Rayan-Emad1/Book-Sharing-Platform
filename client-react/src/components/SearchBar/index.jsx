import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const BookSearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="mx-auto max-w-md flex items-center">
      <FormControl
        type="text"
        placeholder="Search by title, author, or genre"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mr-sm-2"
      />
      <Button variant="outline-success" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default BookSearchBar;
