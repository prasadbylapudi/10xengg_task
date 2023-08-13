import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

const FilterOptions = ({ uniqueAuthors, uniquePublishers, uniqueGenres, onFilterChange }) => {  
 
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleAuthorChange = (author) => {
    setSelectedAuthors((prevAuthors) =>
      prevAuthors.includes(author) ? prevAuthors.filter((a) => a !== author) : [...prevAuthors, author]
    );
  };

  const handlePublisherChange = (publisher) => {
    setSelectedPublishers((prevPublishers) =>
      prevPublishers.includes(publisher) ? prevPublishers.filter((p) => p !== publisher) : [...prevPublishers, publisher]
    );
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre) ? prevGenres.filter((g) => g !== genre) : [...prevGenres, genre]
    );
  };

  const applyFilters = () => {
    onFilterChange(selectedAuthors, selectedPublishers, selectedGenres);
  };

  return (
    <Card style={{marginTop:'80px'}}>
      <h3 style={{ textAlign: 'center', margin: '16px 0' }}>Filter By</h3>
      <CardContent>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Author</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: 'column', maxHeight: '200px', overflowY: 'auto' }}>
            {
              uniqueAuthors.map((author) => {
                return (
                  <div key={author}>
                    <Checkbox
                      checked={selectedAuthors.includes(author)}
                      onChange={() => handleAuthorChange(author)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    {author}
                  </div>
                );
              })
            }
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Genre</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: 'column', maxHeight: '200px', overflowY: 'auto' }}>
             {
              uniqueGenres.map((genre) => {
                return (
                  <div key={genre}>
                    <Checkbox
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    {genre}
                  </div>
                );
              })
             }
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Publisher</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ flexDirection: 'column', maxHeight: '200px', overflowY: 'auto' }}>
             {
              uniquePublishers.map((publisher) => {
                return (
                  <div key={publisher}>
                    <Checkbox
                      checked={selectedPublishers.includes(publisher)}
                      onChange={() => handlePublisherChange(publisher)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    {publisher}
                  </div>
                );
              })
             }
          </AccordionDetails>
        </Accordion>

        <button
          onClick={applyFilters}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s, transform 0.3s',
          }}
        >
        Apply Filters
      </button>
      </CardContent>
    </Card>
  );
};

export default FilterOptions;
