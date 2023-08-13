import React, { useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import Accordion from '@mui/material/Accordion'; 
import AccordionSummary from '@mui/material/AccordionSummary'; 
import Button from '@mui/material/Button';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import Pagination from '@mui/material/Pagination';
import FilterOptions from './Filter';

import { initialBooks } from '../books';


const StyledCard = styled(Card)({
  display: 'flex',
  marginBottom: '8px',
  width: 'calc(50% - 8px)',
  marginRight: '8px',
  '&:nth-child(2n)': {
    marginRight: 0,
  },
});

const StyledAccordionSummary = styled(AccordionSummary)({
  display: 'flex',
  alignItems: 'center',
});

const CoverImage = styled('img')({
  width: '200px',
  height: 'auto',
  marginRight: '8px',
});


export const handleBookSearch = (books,lowerCaseQuery)=>{
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery) ||
        book.genre.toLowerCase().includes(lowerCaseQuery) ||
        book.description.toLowerCase().includes(lowerCaseQuery) ||
        book.publisher.toLowerCase().includes(lowerCaseQuery)
    );
  }

export  const filterBooks = (books,authors, publishers, genres)=>{
    return books.filter((book) => {
    const authorMatch = authors.length === 0 || authors.includes(book.author);
    const publisherMatch = publishers.length === 0 || publishers.includes(book.publisher);
    const genreMatch = genres.length === 0 || genres.includes(book.genre);
    return authorMatch && publisherMatch && genreMatch;
  });

}

const BookList = ({searchQuery }) => {
  const [page, setPage] = useState(1);
  const [expandedAccordions, setExpandedAccordions] = useState([]);

  const handleAccordionToggle = (index) => {
    if (expandedAccordions.includes(index)) {
      setExpandedAccordions(expandedAccordions.filter((item) => item !== index));
    } else {
      setExpandedAccordions([...expandedAccordions, index]);
    }
  };

  const booksPerPage = 6;

 
  const [books, setBooks] = useState(initialBooks);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const displayedBooks = books.slice(startIndex, endIndex);

   

 const handleSearch = _debounce((query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredBooks=handleBookSearch(initialBooks,lowerCaseQuery);
    setBooks(filteredBooks);
  }, 300);

   const handleFilterChange = (authors, publishers, genres) => {
    const filteredBooks = filterBooks(initialBooks,authors, publishers, genres);
    setBooks(filteredBooks);
  };


  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  


const uniqueAuthors = books
    ? [...new Set(books.map((book) => book.author))]
    : [];
  const uniquePublishers = books
    ? [...new Set(books.map((book) => book.publisher))]
    : [];
  const uniqueGenres = books
    ? [...new Set(books.map((book) => book.genre))]
    : [];


    const handleBuyNow = async (book) => {
    try {
      const response = await fetch('https://example.com/api/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookTitle: book.title,
        }),
      });

      if (response.ok) {
        alert(`You have successfully bought ${book.title}`);
      } else {
        throw new Error('Failed to buy the book');
      }
    } catch (error) {
      alert(`An error occurred while buying ${book.title}`);
      console.error('Error buying the book:', error);
    }
  };

  return (
    <div>
     <Grid container spacing={2}>
      <Grid item xs={3}>
        <div style={{ position: 'fixed', width: '25%', paddingRight: '16px' }}>
           <FilterOptions
            uniqueAuthors={uniqueAuthors}
            uniquePublishers={uniquePublishers}
            uniqueGenres={uniqueGenres}
            onFilterChange={handleFilterChange} 
          />
        </div>
      </Grid>
      <Grid item xs={9}>
        <Box style={{marginTop:'80px'}}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {displayedBooks.map((book, index) => (
                <Accordion
                  key={index}
                  expanded={expandedAccordions.includes(index)}
                  onChange={() => handleAccordionToggle(index)}
                  style={{
                    flexBasis: 'calc(50% - 8px)',
                    marginRight: '8px',
                    marginBottom: '8px',
                  }}
                >
                <StyledAccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <div>
                        <CoverImage
                          src={`https://source.unsplash.com/random/300x400?sig=${Math.random()}`}
                          alt="Book Cover"
                          style={{ marginRight: '16px' }}
                        />
                      </div>
                      <div>
                        <Typography variant="h6" style={{marginTop:'8px',color:'#336699'}}>
                         Book Name:  {book.title}
                        </Typography>
                        <Typography variant="h6" style={{marginTop:'8px'}}>
                          Author: {book.author}
                        </Typography>
                        <Typography variant="h6" style={{marginTop:'8px'}}>
                          Publisher: {book.publisher}
                        </Typography>
                        <Typography
                          variant="h6"
                          style={{marginTop:'8px'}}
                        >
                          Genre: {book.genre}
                        </Typography>
                        <Typography variant="h6" style={{ marginTop: '8px' }}>
                          Price: {book.price}
                        </Typography>
                      </div>
                    </StyledAccordionSummary>

                  <AccordionDetails>
                    <div>
                      <CardContent>
                       
                        <Typography
                          variant="body2"
                          style={{ marginTop: '8px' }}
                        >
                          Book Description: {book.description}
                        </Typography>
                        <Button onClick={() => handleBuyNow(book)} style={{ marginTop: '10px' }} variant="outlined">
                          Buy Now
                        </Button>
                      </CardContent>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
        </div>
          <Pagination
            count={Math.ceil(books.length / booksPerPage)}
            page={page}
            onChange={handleChangePage}
            color="secondary"
            style={{ marginTop: '10px' }}
          />
        </Box>
      </Grid>
    </Grid>
    </div>
  );
};

export default BookList;
